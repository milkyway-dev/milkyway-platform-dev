"use client";

import { setMoveX } from "@/src/lib/redux/features/userSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import React, { useState, useRef, useEffect } from "react";

const Footer = ({ initialGames }: any) => {
  const dispatch = useAppDispatch();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [progress, setProgress] = useState(0);

  const totalGames = initialGames?.others?.length || 1;
  const stepCount = Math.ceil(totalGames / 8);
  const stepSize = 100 / (stepCount - 1);

  const getClosestStep = (value: number) => Math.round(value / stepSize) * stepSize;

  const updateProgress = (clientX: number, snap: boolean = false) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let newProgress = ((clientX - rect.left) / rect.width) * 100;
    newProgress = Math.max(0, Math.min(100, newProgress));

    if (snap) newProgress = getClosestStep(newProgress);
    setProgress(newProgress);

    const currentStep = Math.round(newProgress / stepSize);
    dispatch(setMoveX(currentStep));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) updateProgress(e.clientX);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging.current) {
      updateProgress(e.clientX, true);
      isDragging.current = false;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.current) updateProgress(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isDragging.current) {
      updateProgress(e.changedTouches[0].clientX, true);
      isDragging.current = false;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);


  return (
    <footer className="flex items-center justify-start portrait:pb-[1.5vh] landscape:pb-[1.5vw] select-none">
      <div className="w-[80%] pl-[10%] text-white">
        <div
          ref={progressBarRef}
          className="relative portrait:h-[1.5vh] landscape:h-[1.5vw] bg-gradient-to-t from-black to-[#3a090c] border-2 border-[#C88856] rounded-full"
        >
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[#6B0000]"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Draggable Thumb */}
          <div
            className="absolute z-[10] -translate-y-1/2 
              portrait:w-[2.4vh] portrait:bottom-[-.7vh] landscape:bottom-[-.5vw] lg:landscape:bottom-[-.3vw] 
              portrait:h-[2.4vh] landscape:w-[2.4vw] landscape:h-[2.4vw] 
              lg:landscape:w-[2vw] lg:landscape:h-[2vw] 
              border border-white rounded-full cursor-pointer"
            style={{
              left: `calc(${progress}% - 1vw)`,
              transform: progress >= 100 ? "translateX(-50%)" : "translateX(50%)",
              background: "radial-gradient(circle, #A10B16 20%, #000000 80%)",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown} // Fix touch not starting
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
