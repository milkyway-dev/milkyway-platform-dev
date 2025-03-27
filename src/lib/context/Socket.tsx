"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { resetUser, setCredits, updateConnection } from "../redux/features/userSlice";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/src/components/layout/FullScreenLoader";
import Notification from "@/src/components/ui/Notification";
import { config } from "../config";
import { Events } from "../utils";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};

export const SocketProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketInitialized = useRef(false);
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token || socketInitialized.current) return;

    const initializeSocket = async () => {
      let platformId = sessionStorage.getItem("platformId");
      if (!platformId) {
        platformId = crypto.randomUUID();
        sessionStorage.setItem("platformId", platformId);
      }

      console.log("Initializing socket connection...");
      socketInitialized.current = true;

      const socketInstance = io(`${config.server}/playground`, {
        transports: ["websocket"],
        auth: {
          token,
          origin: config.platform,
          playgroundId: platformId,
        },
      });

      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected to Socket.IO server with ID:", socketInstance.id);
        setIsConnected(true);
        dispatch(updateConnection(true));
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
        setIsConnected(false);
        dispatch(resetUser());
        dispatch(updateConnection(false));
        socketInitialized.current = false;
        setSocket(null);
      });

      socketInstance.on("data", (data: any) => {
        switch (data?.type) {
          case Events.PLAYGROUND_CREDITS:
            dispatch(setCredits(data?.payload?.credits));
            break;
          case Events.PLAYGROUND_EXIT:
            dispatch(resetUser());
            router.push("/logout");
            break;
        }
      });

      socketInstance.on("error", (error: { message: string }) => {
        console.error("Socket error:", error.message);
        toast.custom(
          (t) => (
            <Notification
              visible={t.visible}
              message={error.message || "Connection error occurred"}
            />
          ),
          { duration: Infinity }
        );
      });

      socketInstance.on("alert", (message: any) => {
        if (message === "NewTab") {
          toast.custom(
            (t) => (
              <Notification
                visible={t.visible}
                message="You are already active in another tab."
              />
            ),
            { duration: Infinity }
          );
        }
      });

      socketInstance.on("ping", () => {
        socketInstance.emit("pong");
      });
    };

    initializeSocket();

    return () => {
      if (socket) {
        console.log("Cleaning up socket connection");
        socket.disconnect();
        setSocket(null);
        socketInitialized.current = false;
        setIsConnected(false);
      }
    };
  }, [token, dispatch, router]);

  // Ensure UI updates when isConnected changes
  useEffect(() => {
    if (!isConnected) {
      setSocket(null); // Prevent stale socket references
    }
  }, [isConnected]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {isConnected ? children : <FullScreenLoader />}
    </SocketContext.Provider>
  );
};
