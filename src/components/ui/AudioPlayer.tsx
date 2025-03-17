"use client";
import React, { useEffect, useState } from "react";
import { useVolumeControl } from "../../lib/context/VolumeControl";

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
          setError("Autoplay failed. Click to play.");
        } else {
          setError("Failed to play audio.");
        }
        console.error("Audio play error:", err);
      }
    };

    const handleUserInteraction = async () => {
      await handlePlayAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    // Add event listeners for first user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  return (
    <audio ref={audioRef} src="/audio/bg-audio.mp3" loop className="hidden" />
  );
};

export default AudioPlayer;
