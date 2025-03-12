"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Notification from "./Notification";
import Image from "next/image";

const LogoutButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const deleteCookieHandler = () => {
    router?.push("/logout");
    toast.custom((t) => (
      <Notification visible={t.visible} message="Logout successful" />
    ));
    toast.remove();
  };

  return (
    <>
      <button
        className="w-[10vw] h-[10vw] sm:w-[4vw] sm:h-[4vw]"
        onClick={handleClick}
      >
        <Image src="/assets/images/logout.png" alt="setting" width={100} height={100} quality={100} className='portrait:w-[3.4vh] cursor-pointer portrait:h-[3.4vh] landscape:w-[3.4vw] landscape:h-[3.4vw]' />
      </button>
      {open && (
        <div
          className={` w-[100vh] h-[100vw] sm:h-screen sm:w-screen z-[99] bg-black bg-opacity-50 flex items-center justify-center fixed top-0 left-0`}
        >
          <div className="h-auto sm:w-[70%] w-[90vw] relative flex items-center justify-center">
            <svg
              width="875"
              height="146"
              viewBox="0 0 875 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <mask id="path-1-inside-1_722_10728" fill="white">
                <path d="M0 0H875V146H0V0Z" />
              </mask>
              <path
                d="M0 0H875V146H0V0Z"
                fill="url(#paint0_linear_722_10728)"
              />
              <path
                d="M0 8H875V-8H0V8ZM875 138H0V154H875V138Z"
                fill="url(#paint1_linear_722_10728)"
                mask="url(#path-1-inside-1_722_10728)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_722_10728"
                  x1="0"
                  y1="73"
                  x2="875"
                  y2="73"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF2929" stopOpacity="0" />
                  <stop
                    offset="0.0956767"
                    stopColor="#DD573E"
                    stopOpacity="0.3"
                  />
                  <stop offset="0.5" stopColor="#810101" />
                  <stop
                    offset="0.900775"
                    stopColor="#DD573E"
                    stopOpacity="0.3"
                  />
                  <stop offset="1" stopColor="#DD573E" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_722_10728"
                  x1="0"
                  y1="73"
                  x2="875"
                  y2="73"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#739730" stopOpacity="0" />
                  <stop offset="0.30276" stopColor="#739730" />
                  <stop offset="0.5" stopColor="#EBF758" />
                  <stop offset="0.698187" stopColor="#739730" />
                  <stop offset="1" stopColor="#739730" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-auto left-auto">
              <p className="text-[4vw] text-white font-[600] text-center">
                Are you sure you want to logout?
              </p>
              <div className="flex w-[50%] items-center justify-between m-auto">
                <button
                  className="text-[4vw] bg-gradient-to-b text-transparent bg-clip-text from-[#10CD63] to-[#078F42] font-[600] text-center"
                  onClick={deleteCookieHandler}
                >
                  Yes
                </button>
                <button
                  className="text-[4vw] bg-gradient-to-b text-transparent bg-clip-text from-[#ff5039] to-[#ffc8a6] font-[600] text-center"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
