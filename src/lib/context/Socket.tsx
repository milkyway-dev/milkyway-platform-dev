"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import Loader from "@/src/components/ui/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetUser, setCredits, updateConnection } from "../redux/features/userSlice";
import { useRouter } from "next/navigation";
import Notification from "@/src/components/ui/Notification";
import { getAwsAlbCookie } from "@/src/lib/cookies";
import { config } from "../config";
import { Events } from "../utils";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const dispatch = useAppDispatch();

  const connection = useAppSelector((state) => state.user.connected);
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketInitialized = useRef(false);

  const router = useRouter();

  useEffect(() => {
    // Prevent multiple socket initializations
    if (socketInitialized.current || !token) return;

    const initializeSocket = async () => {
    
      const { awsALBCookie, awsALBTGCORSCookie } = await getAwsAlbCookie();
if (config.nodeEnv !== "development" && (!awsALBCookie || !awsALBTGCORSCookie)) {
        console.error("Missing AWS sticky session cookies");
        return;
      }

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

        extraHeaders: {
          Cookie: `AWSALBTG=${awsALBCookie}; AWSALBTGCORS=${awsALBTGCORSCookie}`,
        },
      })

      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected to Socket.IO server with ID:", socketInstance.id);
        setTimeout(() => {
          dispatch(updateConnection(true));
        }, 1000);
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
        dispatch(resetUser());
        dispatch(updateConnection(false));
        socketInitialized.current = false; // Allow reconnection if disconnected
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
          default:
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
          { duration: 5000 }
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
        socketInstance.emit("pong")
      })
    };

    initializeSocket();

    return () => {
      if (socket) {
        console.log("Cleaning up socket connection");
        socket.disconnect();
        socketInitialized.current = false;
      }
    };
  }, [token, dispatch, router]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {connection?children:children}
    </SocketContext.Provider>
  );
};