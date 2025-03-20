"use client";
import Image from "next/image";
import React from "react";

const FullScreenButton: React.FC = () => {
  const fullScreenHandler = (): void => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      msFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };

    const docEl = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (
      !doc.fullscreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      // Enter fullscreen
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  };

  return (
    <button
      id="fullScreen"
      className="w-[10vw] h-[10vw] sm:w-[4vw] sm:h-[4vw]"
      onClick={fullScreenHandler}
    >
      <Image src="/assets/images/fullscreen.png" alt="setting" width={100} height={100} quality={100} className='cursor-pointer portrait:w-[3.7vh] portrait:h-[3.7vh] landscape:w-[3.7vw] landscape:h-[3.7vw]' />
    </button>
  );
};

export default FullScreenButton;
