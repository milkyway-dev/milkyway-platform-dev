"use client";
import { useVolumeControl } from "@/src/lib/context/VolumeControl";
import React, { useEffect, useState } from "react";

const AudioPlayer = () => {
  const { volume, audioRef, playAudio, pauseAudio } = useVolumeControl();
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlayAudio = async () => {
      try {
        await playAudio();
        setIsPlaying(true);
      } catch (err: any) {
        if (err.name === "NotAllowedError") {
          setError("Autoplay failed. Click the button to play the audio.");
        } else {
          setError("Failed to play the audio.");
        }
      }
    };

    handlePlayAudio();

    const handleError = () => {
      setError("An error occurred while trying to load the audio");
    };

    audio.addEventListener("error", handleError);

    const handleBlur = () => {
      if (audio && !audio.paused) {
        pauseAudio();
      }
    };

    const handleFocus = () => {
      if (audio && audio.paused) {
        handlePlayAudio();
      }
    };

    // Detect any user interaction (click, key press, scroll) to play audio
    const handleUserInteraction = () => {
      if (audio && audio.paused) {
        handlePlayAudio();
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("mousedown", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("wheel", handleUserInteraction);

    return () => {
      audio.removeEventListener("error", handleError);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("mousedown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("wheel", handleUserInteraction);
    };
  }, [audioRef]);
  

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  return (
    <audio
      ref={audioRef}
      src={"/audio/bg-audio.mp3"}
      autoPlay
      loop
      className="hidden"
    />
  );
};

export default AudioPlayer;
