"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  MutableRefObject,
} from "react";

interface VolumeControlContextValue {
  volume: number;
  updateVolume: (newVolume: number) => void;
  playAudio: () => Promise<void>;
  pauseAudio: () => void;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const VolumeControlContext = createContext<
  VolumeControlContextValue | undefined
>(undefined);

export const useVolumeControl = (): VolumeControlContextValue => {
  const context = useContext(VolumeControlContext);
  if (!context) {
    throw new Error("useVolumeControl must be used within a VolumeProvider");
  }
  return context;
};

interface VolumeProviderProps {
  children: ReactNode;
}

export const VolumeProvider: React.FC<VolumeProviderProps> = ({ children }) => {
  const [volume, setVolume] = useState<number>(1.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const updateVolume = (newVolume: number): void => {
    const clampedVolume = Math.max(Math.min(newVolume, 1), 0);
    setVolume(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  const playAudio = async (): Promise<void> => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error("Audio play error:", err);
      }
    }
  };

  const pauseAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <VolumeControlContext.Provider
      value={{ volume, updateVolume, playAudio, pauseAudio, audioRef }}
    >
      {children}
    </VolumeControlContext.Provider>
  );
};