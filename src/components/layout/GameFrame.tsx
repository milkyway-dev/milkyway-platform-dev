"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Notification from "../ui/Notification";
import { useVolumeControl } from "@/src/lib/context/VolumeControl";
import { config } from "@/src/lib/config";

interface GameFrameProps {
  data: {
    message?: string;
    url?: string;
  };
}

const GameFrame: React.FC<GameFrameProps> = ({ data }) => {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [gameLoaded, setGameLoaded] = useState<boolean>(false);
  const { playAudio, pauseAudio } = useVolumeControl();
  const [loadingpercent, setLoadingPercent] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (data?.message) {
      toast.custom((t) => (
        <Notification visible={t.visible} message={data.message || ""} />
      ));
      setTimeout(() => {
        playAudio();
        router.push("/");
      }, 1500);
      return;
    }
    if (data?.url) {
      setIframeKey((prevKey) => prevKey + 1);
      pauseAudio();
    }
  }, [data]);

  const getToken = (cookieName: string): string | undefined => {
    const cookies = document.cookie;

    const cookieArray = cookies.split(";").map((cookie) => cookie.trim());
    const cookieObject: Record<string, string> = {};
    cookieArray.forEach((cookie) => {
      const parts = cookie.split("=");
      const key = decodeURIComponent(parts[0]);
      const value = decodeURIComponent(parts.slice(1).join("="));
      cookieObject[key] = value;
    });

    return cookieObject[cookieName];
  };

  useEffect(() => {
    if (loadingpercent !== 70) {
      const intervalId = setInterval(() => {
        if (loadingpercent < 100) {
          setLoadingPercent((prevLoadingPercent) => prevLoadingPercent + 1);
        } else {
          if (loadingpercent >= 100) {
            clearInterval(intervalId);
          }
        }
      }, 70);
      return () => clearInterval(intervalId);
    } else if (gameLoaded) {
      const intervalId = setInterval(() => {
        if (loadingpercent < 100) {
          setLoadingPercent((prevLoadingPercent) => prevLoadingPercent + 1);
        } else {
          if (loadingpercent >= 100) {
            clearInterval(intervalId);
          }
        }
      }, 70);
      return () => clearInterval(intervalId);
    }
  }, [loadingpercent, gameLoaded]);

  useEffect(() => {

   
    if (data && getToken("token")) {
      const handleMessage = (event: MessageEvent) => {
        const message = event.data;

        const iframe = document.getElementById(
          "gameIframe"
        ) as HTMLIFrameElement;
        if (message === "authToken") {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              {
                type: "authToken",
                cookie: getToken("token"),
                AWSALBTG: getToken('AWSALBTG'),
                AWSALBTGCORS: getToken('AWSALBTGCORS'),
                socketURL: config.server,
                console: config.nodeEnv === "production" ? false : true,
                loaderUrl: config.loaderUrl,
                // nameSpace: config.namespace,
              },
              `${data?.url}`
            );
          }
        }

        if (message === "onExit") {
          setGameLoaded(false);
          playAudio();
          router.push("/");
        }

        if (message === "OnEnter") {
          setGameLoaded(true);
        }
      };
      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [data, getToken("token")]);

  return (
    <div className="w-full h-full relative">
      {!gameLoaded && data.url && (
        <iframe
          src={config.loaderUrl}
          width="100%"
          height="100%"
          id="gameLoader"
        />
      )}
      <iframe
        key={iframeKey}
        src={data.url}
        width="100%"
        height="100%"
        className={`rounded-lg transition-opacity duration-300`}
        id="gameIframe"
      ></iframe>
    </div>
  );
};

export default GameFrame;
