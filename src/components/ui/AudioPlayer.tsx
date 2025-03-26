"use client";
import React, { useEffect, useState } from "react";
import { useVolumeControl } from "../../lib/context/VolumeControl";
import { usePathname } from "next/navigation";

const AudioPlayer = () => {
  const { volume, audioRef, playAudio, pauseAudio } = useVolumeControl();
  const pathname = usePathname();
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlayAudio = async () => {
      try {
        await playAudio();
        setIsPlaying(true);
      } catch (err: any) {
        console.error("Audio play error:", err);
        if (err.name === "NotAllowedError") {
          setError("Autoplay blocked. Click anywhere to start.");
        } else {
          setError("Failed to play audio.");
        }
      }
    };

    const handleUserInteraction = () => {
      setHasInteracted(true);
      tryPlayAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    const handleFocus = () => {
      if (hasInteracted && pathname === "/") {
        tryPlayAudio();
      }
    };

    const handleBlur = () => {
      if (audio && !audio.paused) {
        pauseAudio();
      }
    };

    // Play if user interacted and is on /image
    if (pathname === "/" && hasInteracted) {
      tryPlayAudio();
    } else {
      pauseAudio();
    }

    // Listen for user interactions
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [pathname, hasInteracted, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <audio ref={audioRef} src="/audio/bg-audio.mp3" loop className="hidden" />
    </>
  );
};

export default AudioPlayer;
