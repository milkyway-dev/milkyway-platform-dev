import Image from "next/image";
import React, { use } from "react";
import FullScreenButton from "../ui/FullScreenButton";
import LogoutButton from "../ui/LogoutButton";
import User from "./User";

import { jwtDecode } from "jwt-decode";
import { getCookie } from "@/src/lib/cookies";
import Settings from "./Settings";

const Header = async () => {
  const token = await getCookie();
  const decodedToken = await jwtDecode(token as string);

  return (
    <>
      <div className="portrait:h-[4.5vh] flex items-center  landscape:h-[4.5vw] relative w-full">
        <div className='portrait:w-[65vh] landscape:w-[65vw] flex items-start h-full'>
          <User data={decodedToken} />
          <Settings />
        </div>
        <div className='portrait:w-[35vh] portrait:gap-x-[.8vh] portrait:pr-[2vh] landscape:pr-[2vw] landscape:gap-x-[.8vw] landscape:w-[35vw]  flex items-center justify-end'>
          <FullScreenButton />
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Header;
