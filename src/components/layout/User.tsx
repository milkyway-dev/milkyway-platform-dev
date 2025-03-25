"use client";

import React, { useEffect, useState } from "react";
import AvatarBorder from "../svgs/AvatarBorder";
import Logo from "../svgs/Logo";
import Image from "next/image";
import Connector from "../svgs/Connector";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { setAvatar } from "@/src/lib/redux/features/userSlice";

const User = ({ data }: any) => {
  const credit = useAppSelector((state) => state.user.credits);
  const avatar = useAppSelector((state) => state.user.avatar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let avatarIndex = Cookies.get("index");

    // Validate and set the avatar index
    if (!avatarIndex || isNaN(parseInt(avatarIndex, 10))) {
      avatarIndex = (Math.floor(Math.random() * 10) + 1).toString();
      Cookies.set("index", avatarIndex); // Save to cookies if not found
    }

    dispatch(setAvatar(parseInt(avatarIndex, 10)));
  }, [dispatch]);

  return (
      <div
        style={{
          backgroundImage: "url('/assets/images/header-bg.png')",
          backgroundPosition: "left",
          backgroundSize: "contain",
        }}
        className="bg-no-repeat  portrait:w-[35vh] landscape:w-[35vw] h-full flex items-start justify-between landscape:px-[1vw] portrait:px-[1vh]"
      >
        {/* Profile Section */}
        <div className="flex items-start z-[3] landscape:gap-x-[.7vw] portrait:gap-x-[.7vh]">
          <Image
            src={`/avatar/avatar${avatar}.png`}
            alt='profile_picture'
            width={400}
            height={400}
            quality={100}
            className="landscape:w-[6vw] border-2 rounded-full p-1 landscape:h-[6vw] portrait:w-[6vh] portrait:h-[6vh] object-cover"
          />
          <span className="font-semibold text-white portrait:pt-[1.4vh] landscape:pt-[1.4vw] landscape:text-[1.1vw] portrait:text-[1.1vh] tracking-wider uppercase">
          {data?.username}
          </span>
        </div>

        {/* Coin Balance Section (Now inside background) */}
        <div className="relative flex portrait:mr-[2vh] landscape:mr-[2vw] landscape:mt-[.6vw] portrait:mt-[.6vh] items-center bg-black/80 rounded-full px-[1.1vw] py-[.2vw] portrait:px-[1.1vh] portrait:py-[.3vh] border border-gray-700">
          {/* Coin Image */}
          <div className="absolute left-0 -translate-x-1/2">
            <Image
              src="/assets/images/coin.png"
              alt="Coins"
              width={65}
              height={65}
              quality={100}
              className="object-contain w-[3vw] h-[3vw] portrait:w-[3vh] portrait:h-[3vh]"
            />
          </div>
          {/* Balance Text */}
          <p className="portrait:ml-[1.5vh] tracking-wide landscape:ml-[1.5vw] 
  bg-gradient-to-b from-[#F6F693] via-[#FCC20C] to-[#EE9502] 
  bg-clip-text text-transparent 
  portrait:text-[1.1vh] landscape:text-[1.1vw] font-bold">
             {parseFloat((credit ?? 0).toFixed(1))}
          </p>
        </div>
      </div>
  );
};

export default User;