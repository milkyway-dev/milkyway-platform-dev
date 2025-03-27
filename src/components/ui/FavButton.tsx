
import toast from "react-hot-toast";
import Notification from "./Notification";
import { useState, MouseEvent } from "react";
import { addFavGame } from "@/src/lib/actions";
import Image from "next/image";

interface FavButtonProps {
  favgame: { _id: string }[]; // Array of favorite games with IDs
  id: string; // ID of the current game
}

const FavButton: React.FC<FavButtonProps> = ({ favgame, id }) => {
  const [gamefav, setGamefav] = useState<string[]>([]);

  // Determine if the current game is favorited
  const isFav =
    gamefav?.length > 0
      ? gamefav?.includes(id)
      : favgame?.some((item) => item?._id === id);

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>,
    id: string,
    type: "add" | "remove"
  ): Promise<void> => {
    event.stopPropagation();
    event.preventDefault();

    try {
     
      const response = await addFavGame(id, type);
      console.log(response,"res")
      if (response?.data) {
        setGamefav(response?.data?.favouriteGames || []);
        toast.custom((t) => (
          <Notification visible={t.visible} message={response?.message || ""} />
        ));

        setTimeout(() => {
          toast.remove();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding/removing favorite game:", error);
    }
  };

  return (
    <button
      className="absolute right-[-.7vw] top-[-.4vw] z-[9990] portrait:w-[4vh] portrait:h-[4vh] landscape:w-[4vw] landscape:h-[4vw] lg:landscape:w-[3.5vw] lg:landscape:h-[3.5vw]"
      onClick={(event) => handleClick(event, id, isFav ? "remove" : "add")}
    >
      {gamefav.includes(id) || isFav ? (
      <Image
        src="/assets/images/fav-heart.png"
        alt="favorite-icon"
        fill
        className="object-cover"/>
      ) : (
        <svg width="100%" height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_365_530)">
            <g filter="url(#filter1_i_365_530)">
              <circle cx="34" cy="31" r="25" fill="#343433" />
            </g>
            <g clipPath="url(#clip0_365_530)">
              <path d="M33.8552 23.4937L34.5081 24.1395L35.1611 23.4937C36.8553 21.818 38.5525 21.0588 40.1048 20.9487L40.0391 20.0224L40.1048 20.9487C41.8545 20.8246 43.4154 21.5272 44.5653 22.6736C46.8674 24.9688 47.5158 29.0328 44.7535 31.7955C44.7534 31.7956 44.7533 31.7957 44.7532 31.7958L44.7532 31.7958L34.5083 41.0757H34.508L24.2631 31.7958C21.4817 29.0144 22.1303 24.9502 24.4371 22.6597L24.4371 22.6597C25.5892 21.5156 27.1535 20.8165 28.9062 20.9434C30.4612 21.0561 32.1605 21.8175 33.8552 23.4937Z" fill="#A10B16" />
              <path d="M33.8552 23.4937L34.5081 24.1395L35.1611 23.4937C36.8553 21.818 38.5525 21.0588 40.1048 20.9487L40.0391 20.0224L40.1048 20.9487C41.8545 20.8246 43.4154 21.5272 44.5653 22.6736C46.8674 24.9688 47.5158 29.0328 44.7535 31.7955C44.7534 31.7956 44.7533 31.7957 44.7532 31.7958L44.7532 31.7958L34.5083 41.0757H34.508L24.2631 31.7958C21.4817 29.0144 22.1303 24.9502 24.4371 22.6597L24.4371 22.6597C25.5892 21.5156 27.1535 20.8165 28.9062 20.9434C30.4612 21.0561 32.1605 21.8175 33.8552 23.4937Z" fill="black" fillOpacity="0.8" />
              <path d="M33.8552 23.4937L34.5081 24.1395L35.1611 23.4937C36.8553 21.818 38.5525 21.0588 40.1048 20.9487L40.0391 20.0224L40.1048 20.9487C41.8545 20.8246 43.4154 21.5272 44.5653 22.6736C46.8674 24.9688 47.5158 29.0328 44.7535 31.7955C44.7534 31.7956 44.7533 31.7957 44.7532 31.7958L44.7532 31.7958L34.5083 41.0757H34.508L24.2631 31.7958C21.4817 29.0144 22.1303 24.9502 24.4371 22.6597L24.4371 22.6597C25.5892 21.5156 27.1535 20.8165 28.9062 20.9434C30.4612 21.0561 32.1605 21.8175 33.8552 23.4937Z" stroke="url(#paint0_linear_365_530)" strokeWidth="1.85714" />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_365_530" x="0" y="0" width="66" height="66" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-1" dy="2" />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.64 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_365_530" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_365_530" result="shape" />
            </filter>
            <filter id="filter1_i_365_530" x="9" y="6" width="50" height="52.1277" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="2.12766" />
              <feGaussianBlur stdDeviation="3.93617" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_365_530" />
            </filter>
            <linearGradient id="paint0_linear_365_530" x1="34.5006" y1="20" x2="34.5006" y2="42.0043" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFDB90" />
              <stop offset="1" stopColor="#D18C06" />
            </linearGradient>
            <clipPath id="clip0_365_530">
              <rect width="26" height="26" fill="white" transform="translate(21.5 18)" />
            </clipPath>
          </defs>
        </svg>

      )}
    </button>
  );
};

export default FavButton;
