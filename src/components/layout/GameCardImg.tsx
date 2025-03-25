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
    <div className="relative w-full  h-full" ref={ref}>
      {isIntersecting && (
        <>
        
          {/* Game Image inside the Frame */}
          <div className="absolute  top-0 left-0 w-full h-full  flex items-center justify-center">
            <Image
              src={src}
              fill
              className=" landscape:py-[.7vw] landscape:rounded-[3vw] portrait:px-[.6vh] landscape:px-[.6vw] portrait:py-[.7vh] portrait:rounded-[3vh] object-fit"
              alt="game-img"
            />
             
          </div>
          
        </>
      )}
    </div>
  );
};

export default GameCardImg;
