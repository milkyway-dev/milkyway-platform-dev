"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetUser, setCredits, updateConnection } from "../redux/features/userSlice";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/src/components/layout/FullScreenLoader";
import Notification from "@/src/components/ui/Notification";
import {getAwsAlbCookie} from "@/src/lib/cookies";
import { config } from "../config";

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
  const router = useRouter();

  useEffect(() => {
    const initializeSocket = async () => {
      const { awsALBCookie, awsALBTGCORSCookie } = await getAwsAlbCookie();
      if (!awsALBCookie || !awsALBTGCORSCookie) {
        console.error("Missing AWS sticky session cookies");
        return;
      }

      let platformId = sessionStorage.getItem("platformId");
      if (!platformId) {
        platformId = crypto.randomUUID();
        sessionStorage.setItem("platformId", platformId);
      }

      const socketInstance = io(config.server, {
        transports: ["websocket"],
        auth: {
          token,
          origin: config.platform,
          platformId,
        },
        extraHeaders: {
          Cookie: `AWSALBTG=${awsALBCookie}; AWSALBTGCORS=${awsALBTGCORSCookie}`,
        },
      });

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
      });

      socketInstance.on("data", (data: any) => {
        switch (data?.type) {
          case "CREDIT":
            dispatch(setCredits(data?.data?.credits));
            break;
          default:
        }
      });

      socketInstance.on("alert", (message: any) => {
        if (message === "ForcedExit") {
          dispatch(resetUser());
          router.push("/logout");
        } else if (message === "NewTab") {
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

      return () => {
        socketInstance.disconnect();
      };
    };

    if (token) {
      initializeSocket();
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {!connection ? <FullScreenLoader /> : children}
    </SocketContext.Provider>
  );
};
