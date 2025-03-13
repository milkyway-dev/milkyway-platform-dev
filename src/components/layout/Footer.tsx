"use client";
import React, { useState, useRef } from "react";

const Footer = () => {
  const [progress, setProgress] = useState(10);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateProgress = (clientX: number) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    let newProgress = ((clientX - rect.left) / rect.width) * 100;
    newProgress = Math.max(0, Math.min(100, newProgress)); // Clamp between 0-100
    setProgress(newProgress);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updateProgress(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      updateProgress(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updateProgress(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.current) {
      updateProgress(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  React.useEffect(() => {
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
    <footer className="flex items-center  justify-start pb-[2.5vw] select-none">
      <div className="w-[80%] pl-[10%] text-white">
        <div
          ref={progressBarRef}
          className="relative portrait:h-[1.5vh] landscape:h-[1.5vw] bg-black border border-[#C89C6C] rounded-full overflow-hidden"
        >
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-full bg-[#6B0000]"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Draggable Thumb */}
          <div
            className="absolute z-[10] top-1/2 -translate-y-1/2 portrait:w-[1.4vh]  portrait:h-[1.4vh] landscape:w-[1.4vw]  landscape:h-[1.4vw] bg-[#990000] border border-white rounded-full cursor-pointer"
            style={{ left: `calc(${progress}% - 13px)` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          ></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
