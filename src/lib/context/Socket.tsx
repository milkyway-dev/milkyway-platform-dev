'use client';

import { useEffect, useState, createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { getAwsAlbCookie } from "../cookies";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetUser, setCredits, updateConnection } from "../redux/features/userSlice";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/src/components/layout/FullScreenLoader";
import toast from "react-hot-toast";
import Notification from "@/src/components/ui/Notification";
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
  const router = useRouter();
  const connection = useAppSelector((state) => state.user.connected);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [awsALBCookie, setAwsALBCookie] = useState<string | null>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      if (token) {
        // Fetch or generate platformId
        let platformId = sessionStorage.getItem("platformId");
        if (!platformId) {
          platformId = crypto.randomUUID();
          sessionStorage.setItem("platformId", platformId);
        }

        // Fetch AWSALB Cookie
        const awsCookie = await getAwsAlbCookie();
        if (awsCookie) {
          setAwsALBCookie(awsCookie);
          console.log("AWSALB Cookie:", awsCookie);
        }

        // Initialize socket
        const socketInstance = io(`${config.server}`, {
          transports: ["websocket"],
          auth: { token, origin: config.platform, platformId, awsALBCookie: awsCookie },
        });

        setSocket(socketInstance);

        socketInstance.on("connect", () => {
          console.log("Connected with socket id:", socketInstance.id);
          setTimeout(() => {
            dispatch(updateConnection(true));
          }, 1000);
        });

        socketInstance.on("disconnect", () => {
          console.log("Disconnected from socket");
          dispatch(resetUser());
          dispatch(updateConnection(false));
        });

        socketInstance.on("data", (data: any) => {
          if (data?.type === "CREDIT") {
            dispatch(setCredits(data?.data?.credits));
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
      }
    };

    initializeSocket();
  }, [token]); // Runs when `token` changes

  return (
    <SocketContext.Provider value={{ socket }}>
      {!connection ? <FullScreenLoader /> : children}
    </SocketContext.Provider>
  );
};
