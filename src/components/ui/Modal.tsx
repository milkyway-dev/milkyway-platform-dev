"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  modalType?: string;
  setModalType?: (type: string) => void; // Optional
  disableClose?: boolean;
  renderImage?: string;
}

const Modal = ({
  children,
  isOpen,
  setOpen,
  modalType,
  setModalType,
  disableClose,
  renderImage
}: ModalProps) => {
  const [isOnClient, setIsOnClient] = useState<Boolean>(false);

  useEffect(() => {
    setIsOnClient(true);
  }, []);

  const handleClick = () => {
    if (setModalType) setModalType("");
    setOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    // Optionally log a warning or handle the case when the element doesn't exist
    console.warn('Element with id "modal" not found');
    return null; // Return null or render a fallback UI
  }

  return isOnClient
    ? ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000096] z-[999]">
        <div
          className={`w-[65%] h-auto relative animate-popup ${modalType === "Note"
            ? "-rotate-90 sm:rotate-0 w-[90vw] sm:w-[65%]"
            : ""
            }`}
        >
          <svg width="100%" height="100%" viewBox="0 0 1446 966" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.5866 116.147H6.01332C3.24454 116.147 1 113.902 1 111.133V66.0133C1 63.2445 3.24454 61 6.01332 61H59.4888C62.2575 61 64.5021 63.2445 64.5021 66.0133V89.4088H1383.17V66.0133C1383.17 63.2445 1385.41 61 1388.18 61H1439.99C1442.76 61 1445 63.2445 1445 66.0133V111.133C1445 113.902 1442.76 116.147 1439.99 116.147H1413.25V907.416H1439.99C1442.76 907.416 1445 909.66 1445 912.429V960.056C1445 962.824 1442.76 965.069 1439.99 965.069H1388.18C1385.41 965.069 1383.17 962.824 1383.17 960.056V934.989H64.5021V960.056C64.5021 962.824 62.2575 965.069 59.4888 965.069H6.01332C3.24454 965.069 1 962.824 1 960.056V912.429C1 909.66 3.24454 907.416 6.01332 907.416H33.5866V116.147Z" fill="url(#paint0_linear_487_690)" />
            <path d="M33.5866 116.147H6.01332C3.24454 116.147 1 113.902 1 111.133V66.0133C1 63.2445 3.24454 61 6.01332 61H59.4888C62.2575 61 64.5021 63.2445 64.5021 66.0133V89.4088M33.5866 116.147V85.2311H26.9022M33.5866 116.147V907.416M33.5866 907.416H6.01332C3.24454 907.416 1 909.66 1 912.429V960.056C1 962.824 3.24454 965.069 6.01332 965.069H59.4888C62.2575 965.069 64.5021 962.824 64.5021 960.056V934.989M33.5866 907.416V934.989H27.7377M1422.44 934.989H1413.25V907.416M1413.25 907.416H1439.99C1442.76 907.416 1445 909.66 1445 912.429V960.056C1445 962.824 1442.76 965.069 1439.99 965.069H1388.18C1385.41 965.069 1383.17 962.824 1383.17 960.056V934.989M1413.25 907.416V116.147M1413.25 116.147H1439.99C1442.76 116.147 1445 113.902 1445 111.133V66.0133C1445 63.2445 1442.76 61 1439.99 61H1388.18C1385.41 61 1383.17 63.2445 1383.17 66.0133V89.4088M1413.25 116.147V85.2311H1422.44M64.5021 89.4088H1383.17M64.5021 89.4088V116.147M1383.17 89.4088V116.147M64.5021 934.989H1383.17M64.5021 934.989V907.416M1383.17 934.989V907.416M64.5021 116.147H1383.17M64.5021 116.147V907.416M1383.17 116.147V907.416M1383.17 907.416H64.5021" stroke="black" strokeWidth="1.67111" />
            <path d="M6.01465 66.0146H59.4901" stroke="url(#paint1_linear_487_690)" strokeWidth="3.34221" />
            <path d="M69.5146 94.4215L696.18 94.4215" stroke="url(#paint2_linear_487_690)" strokeWidth="3.34221" />
            <path d="M69.5146 929.975L696.18 929.975" stroke="url(#paint3_linear_487_690)" strokeWidth="3.34221" />
            <path d="M1407.4 911.594L1407.4 112.805" stroke="url(#paint4_linear_487_690)" strokeWidth="3.34221" />
            <path d="M39.4355 911.594L39.4356 112.805" stroke="url(#paint5_linear_487_690)" strokeWidth="3.34221" />
            <path d="M6.01465 960.056H59.4901" stroke="url(#paint6_linear_487_690)" strokeWidth="3.34221" />
            <path d="M1385.67 66.0146H1439.15" stroke="url(#paint7_linear_487_690)" strokeWidth="3.34221" />
            <path d="M1385.67 960.056H1439.15" stroke="url(#paint8_linear_487_690)" strokeWidth="3.34221" />
            <rect x="68" y="120" width="1309.47" height="786.131" fill="url(#paint9_linear_487_690)" />
            <defs>
              <linearGradient id="paint0_linear_487_690" x1="381.593" y1="61" x2="381.593" y2="1427.96" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EDB566" />
                <stop offset="0.21" stopColor="#D29B43" />
                <stop offset="0.445" stopColor="#F1E6AE" />
                <stop offset="0.68" stopColor="#D29B43" />
                <stop offset="1" stopColor="#EDB566" />
              </linearGradient>
              <linearGradient id="paint1_linear_487_690" x1="6.01465" y1="66.5146" x2="59.4901" y2="66.5146" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint2_linear_487_690" x1="69.5146" y1="94.9215" x2="696.18" y2="94.9215" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint3_linear_487_690" x1="69.5146" y1="930.475" x2="696.18" y2="930.475" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint4_linear_487_690" x1="1407.9" y1="911.594" x2="1407.9" y2="112.805" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint5_linear_487_690" x1="39.9355" y1="911.594" x2="39.9356" y2="112.805" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint6_linear_487_690" x1="6.01465" y1="960.556" x2="59.4901" y2="960.556" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint7_linear_487_690" x1="1385.67" y1="66.5146" x2="1439.15" y2="66.5146" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint8_linear_487_690" x1="1385.67" y1="960.556" x2="1439.15" y2="960.556" gradientUnits="userSpaceOnUse">
                <stop offset="0.103203" stopColor="#C65153" stopOpacity="0.2" />
                <stop offset="0.399429" stopColor="white" />
                <stop offset="0.597742" stopColor="white" />
                <stop offset="0.9" stopColor="#C65153" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="paint9_linear_487_690" x1="722.735" y1="120" x2="722.735" y2="906.131" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2E0302" />
                <stop offset="1" stopColor="#940B06" />
              </linearGradient>
            </defs>
          </svg>


          <div className="w-full absolute top-0 left-0 h-full flex flex-col items-center justify-center ">

            <div className=" w-[100%] h-[15%] mt-1 absolute portrait:top-[1.5vh] landscape:top-[1.5vw] left-0 flex items-center justify-center">
              {renderImage&&<Image
                fill
                src={renderImage}
                alt="popup-bg"
                className="z-0 object-contain mx-auto"
              />}
            </div>
            <div className=" h-[85%]  w-[98.5%]  ">{children}</div>
          </div>
          {disableClose ? null : (
            <button
              className="absolute right-[-2.5%] cursor-pointer hover:scale-[1.1] transition-all top-[4%] h-[10%] w-[10%]"
              onClick={handleClick}
            >
              <svg width="100%" height="100%" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_499_1121)">
                  <g filter="url(#filter1_i_499_1121)">
                    <circle cx="68" cy="62" r="50" fill="#343433" />
                  </g>
                  <g clipPath="url(#clip0_499_1121)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.3407 37.0879C46.8902 35.6374 44.5384 35.6374 43.0879 37.0879C41.6374 38.5384 41.6374 40.8902 43.0879 42.3407L62.7472 62L43.0879 81.6593C41.6374 83.1098 41.6374 85.4617 43.0879 86.9121C44.5384 88.3625 46.8902 88.3625 48.3407 86.9121L68 67.2528L87.6593 86.9121C89.1098 88.3625 91.4617 88.3625 92.9121 86.9121C94.3625 85.4617 94.3625 83.1098 92.9121 81.6593L73.2528 62L92.9121 42.3407C94.3625 40.8902 94.3625 38.5384 92.9121 37.0879C91.4617 35.6374 89.1098 35.6374 87.6593 37.0879L68 56.7472L48.3407 37.0879Z" fill="black" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.3407 37.0879C46.8902 35.6374 44.5384 35.6374 43.0879 37.0879C41.6374 38.5384 41.6374 40.8902 43.0879 42.3407L62.7472 62L43.0879 81.6593C41.6374 83.1098 41.6374 85.4617 43.0879 86.9121C44.5384 88.3625 46.8902 88.3625 48.3407 86.9121L68 67.2528L87.6593 86.9121C89.1098 88.3625 91.4617 88.3625 92.9121 86.9121C94.3625 85.4617 94.3625 83.1098 92.9121 81.6593L73.2528 62L92.9121 42.3407C94.3625 40.8902 94.3625 38.5384 92.9121 37.0879C91.4617 35.6374 89.1098 35.6374 87.6593 37.0879L68 56.7472L48.3407 37.0879Z" fill="url(#paint0_linear_499_1121)" />
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_499_1121" x="0" y="0" width="132" height="132" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-2" dy="4" />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.64 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_499_1121" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_499_1121" result="shape" />
                  </filter>
                  <filter id="filter1_i_499_1121" x="18" y="12" width="100" height="104.255" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4.25532" />
                    <feGaussianBlur stdDeviation="7.87234" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_499_1121" />
                  </filter>
                  <linearGradient id="paint0_linear_499_1121" x1="68" y1="36" x2="68" y2="87.9999" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFDB90" />
                    <stop offset="1" stopColor="#D18C06" />
                  </linearGradient>
                  <clipPath id="clip0_499_1121">
                    <rect width="52" height="52" fill="white" transform="translate(42 36)" />
                  </clipPath>
                </defs>
              </svg>

            </button>
          )}
        </div>
      </div>,
      modalElement
    )
    : null;
};

export default Modal;
