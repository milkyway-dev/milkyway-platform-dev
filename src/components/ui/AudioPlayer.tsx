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

    // Attempt to play the audio when the component mounts
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
        console.error("Audio play error:", err);
      }
    };

    handlePlayAudio();

    // Error event listener
    const handleError = () => {
      setError("An error occurred while trying to load the audio");
      console.error("Audio loading error");
    };

    audio.addEventListener("error", handleError);

    // Pause audio when window is out of focus
    const handleBlur = () => {
      if (audio && !audio.paused) {
        pauseAudio();
      }
    };

    // Resume audio when window is back in focus
    const handleFocus = () => {
      if (audio && audio.paused) {
        handlePlayAudio(); // Re-attempt to play the audio
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Clean up the event listener on component unmount
    return () => {
      audio.removeEventListener("error", handleError);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
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