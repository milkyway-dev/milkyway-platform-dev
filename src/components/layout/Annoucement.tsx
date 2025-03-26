import Image from "next/image";
import React, { useState } from "react";

const Annoucement: React.FC = () => {
  const [option, setOption] = useState("Announcement");
  const sideMenu = [{ img: '/assets/popup/announce.png', title: "Announcement" }, { img: '/assets/popup/game-manage.png', title: "Game management" }];

  return (
    <div className="h-[45%] w-full">
      <div className="h-full w-[70%] mx-auto portrait:gap-x-[2.5vh] landscape:gap-x-[2.5vw] flex">
        {sideMenu?.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full h-full cursor-pointer"
            onClick={() => {
              setOption(data.title);
            }}
          >
            <Image src={data.img} alt="img" width={600} height={200} quality={100} className={`${data.title !== option && 'opacity-50'} w-[80%] h-auto`} />
          </div>
        ))}
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <div
          style={{
            backgroundImage: "url(/assets/popup/Announcement-bg.png)",
            backgroundSize: "contain", // Makes sure the image covers the text area
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "80%", // Adjust as needed
          }}
          className="rounded-[0.5vw] overflow-hidden flex justify-center items-center landscape:text-[1.2vw] portrait:text-[1.2vh] text-black min-h-[50vh] p-4"
        >
          <div className="w-[90%] flex justify-center custom-font items-center text-center">
            {option === "Announcement" && <Announce />}
            {option === "Game management" && <GameManage />}
          </div>
        </div>
      </div>


    </div>
  );
};

const Announce = () => {
  return (
    <p className="slideIn">
      Upgrade version with more featured games and big jackpots is <br /> coming
      soon!
      More FUN!
      More WIN!
    </p>
  );
};

const GameManage = () => {
  return (
    <p className="slideIn">
      To access game management by long pressing the game logos in the lobby.
    </p>
  );
};

export default Annoucement;
