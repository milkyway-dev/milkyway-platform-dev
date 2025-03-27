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

  const connection = useAppSelector((state) => state.user.connected);
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketInitialized = useRef(false);

  const router = useRouter();

  useEffect(() => {
    // Prevent multiple socket initializations
    if (socketInitialized.current || !token) return;

    const initializeSocket = async () => {
    
      const { awsALBCookie, AWSALBCORSCookie } = await getAwsAlbCookie();
if (config.nodeEnv !== "development" && (!awsALBCookie || !AWSALBCORSCookie)) {
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

      const socketInstance = io(`${config.server}`, {
        transports: ["websocket"],
        auth: {
          token,
          origin: config.platform,
          // playgroundId: platformId,
        },

        extraHeaders: {
          Cookie: `AWSALB=${awsALBCookie}; AWSALBCORS=${AWSALBCORSCookie}`,
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

      // ...rest of your event handlers
      socketInstance.on("data", (data: any) => {
        dispatch(setCredits(data?.data?.credits));

        switch (data?.type) {
          case "CREDIT":
            dispatch(setCredits(data?.data?.credits));
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
        console.log("Alert:", message);
        if (message === "ForcedExit") {
          dispatch(resetUser());
          router.push("/logout");
        } else if (message === "NewTab"||message === "Platform already connected.") {
          toast.custom(
            (t) => (
              <Notification
                visible={t.visible}
                message="You are already active in another tab."
              />
            ),
            { duration: Infinity }
          );
        }else if (message === "Platform already connected.") {
          toast.custom(
            (t) => (
              <Notification
                visible={t.visible}
                message="You'r already loged in on another browser or tab."
              />
            ),
            { duration: Infinity }
          );
        }
      });
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
      {connection?children:<Loader/>}
    </SocketContext.Provider>
  );
};