"use client";
import Image from "next/image";
import React from "react";
import useIntersectionObserver from "./IntersectionObserver";

interface GameCardImgProps {
  src: string;
  type: string;
}

const GameCardImg: React.FC<GameCardImgProps> = ({ src, type }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  return (
    <div className="relative w-full h-full" ref={ref}>
      {isIntersecting && (
        <>
        
          
          {/* Game Image inside the Frame */}
          <div className="absolute  top-0 left-0 w-full h-full flex items-center justify-center p-[5%]">
            <Image
              src={src}
              fill
              className="rounded-[3vw] portrait:py-[.2vh] landscape:py-[.2vw] object-cover"
              alt="game-img"
            />
             
          </div>
          
        </>
      )}
    </div>
  );
};

export default GameCardImg;
