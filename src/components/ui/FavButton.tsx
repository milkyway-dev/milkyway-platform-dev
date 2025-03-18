import toast from "react-hot-toast";
import Notification from "./Notification";
import { useState, MouseEvent } from "react";
import { addFavGame } from "@/src/lib/actions";

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
      className="absolute right-[-.5vw] top-[-.3vw] z-[9999] w-[20%] h-[20%]"
      onClick={(event) => handleClick(event, id, isFav ? "remove" : "add")}
    >
      {gamefav.includes(id) || isFav ? (
       <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
       <g filter="url(#filter0_i_192_1460)">
       <circle cx="25" cy="25" r="25" fill="#343433"/>
       </g>
       <g clipPath="url(#clip0_192_1460)">
       <path d="M25.5081 18.1395L24.8552 17.4937C23.1605 15.8175 21.4612 15.0561 19.9062 14.9434C18.1535 14.8165 16.5892 15.5156 15.4371 16.6597L15.4371 16.6597C13.1303 18.9502 12.4817 23.0144 15.2631 25.7958C15.2631 25.7958 15.2631 25.7958 15.2631 25.7958L25.508 35.0757H25.5083L35.7532 25.7958L35.7532 25.7958M25.5081 18.1395L35.5653 16.6736M25.5081 18.1395L26.1611 17.4937M25.5081 18.1395L26.1611 17.4937M35.7532 25.7958C35.7529 25.7961 35.7525 25.7965 35.7521 25.7969L35.7532 25.7958ZM35.7532 25.7958L35.7535 25.7955C38.5158 23.0328 37.8674 18.9687 35.5653 16.6736M35.5653 16.6736C34.4154 15.5272 32.8545 14.8246 31.1048 14.9487L31.0391 14.0226M35.5653 16.6736L31.0391 14.0226M26.1611 17.4937C27.8553 15.818 29.5525 15.0588 31.1048 14.9487L31.0391 14.0226M26.1611 17.4937L31.0391 14.0226" fill="#A10B16" stroke="url(#paint0_linear_192_1460)" strokeWidth="1.85714"/>
       </g>
       <defs>
       <filter id="filter0_i_192_1460" x="0" y="0" width="50" height="52.1277" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
       <feFlood floodOpacity="0" result="BackgroundImageFix"/>
       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
       <feOffset dy="2.12766"/>
       <feGaussianBlur stdDeviation="3.93617"/>
       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
       <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
       <feBlend mode="normal" in2="shape" result="effect1_innerShadow_192_1460"/>
       </filter>
       <linearGradient id="paint0_linear_192_1460" x1="25.5006" y1="14" x2="25.5006" y2="36.0043" gradientUnits="userSpaceOnUse">
       <stop stopColor="#FFDB90"/>
       <stop offset="1" stopColor="#D18C06"/>
       </linearGradient>
       <clipPath id="clip0_192_1460">
       <rect width="26" height="26" fill="white" transform="translate(12.5 12)"/>
       </clipPath>
       </defs>
       </svg>
       

      ) : (
        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
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
