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
      className="absolute right-[0px] top-[2vw] z-10 w-[25%] h-[25%]"
      onClick={(event) => handleClick(event, id, isFav ? "remove" : "add")}
    >
      {gamefav.includes(id) || isFav ? (
        <svg
          id="heartSVG"
          xmlns="http://www.w3.org/2000/svg"
          width="92"
          height="73"
          viewBox="0 0 92 73"
          fill="none"
          className="w-full h-full"
        >
          <g filter="url(#filter0_d_285_2223)">
            <path
              d="M4 32.5C4 14.5507 18.5507 0 36.5 0H88V65H36.5C18.5507 65 4 50.4493 4 32.5Z"
              fill="url(#paint0_linear_285_2223)"
            />
            <g filter="url(#filter1_i_285_2223)">
              <circle
                cx="39.5"
                cy="32.5"
                r="26.5"
                fill="url(#paint1_linear_285_2223)"
              />
            </g>
            <g filter="url(#filter2_d_285_2223)">
              <path
                d="M56.75 30.1719C56.75 41.6562 39.722 50.952 38.9968 51.3359C38.8057 51.4388 38.592 51.4926 38.375 51.4926C38.158 51.4926 37.9443 51.4388 37.7532 51.3359C37.028 50.952 20 41.6562 20 30.1719C20.003 27.4751 21.0757 24.8896 22.9826 22.9826C24.8896 21.0757 27.4751 20.003 30.1719 20C33.5598 20 36.526 21.4569 38.375 23.9195C40.224 21.4569 43.1902 20 46.5781 20C49.2749 20.003 51.8604 21.0757 53.7674 22.9826C55.6743 24.8896 56.747 27.4751 56.75 30.1719Z"
                fill="url(#paint2_radial_285_2223)"
              />
              <path
                d="M56.75 30.1719C56.75 41.6562 39.722 50.952 38.9968 51.3359C38.8057 51.4388 38.592 51.4926 38.375 51.4926C38.158 51.4926 37.9443 51.4388 37.7532 51.3359C37.028 50.952 20 41.6562 20 30.1719C20.003 27.4751 21.0757 24.8896 22.9826 22.9826C24.8896 21.0757 27.4751 20.003 30.1719 20C33.5598 20 36.526 21.4569 38.375 23.9195C40.224 21.4569 43.1902 20 46.5781 20C49.2749 20.003 51.8604 21.0757 53.7674 22.9826C55.6743 24.8896 56.747 27.4751 56.75 30.1719Z"
                fill="url(#paint3_radial_285_2223)"
                fillOpacity="0.5"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_285_2223"
              x="0"
              y="0"
              width="92"
              height="73"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_285_2223"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_285_2223"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_i_285_2223"
              x="13"
              y="6"
              width="53"
              height="57"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_285_2223"
              />
            </filter>
            <filter
              id="filter2_d_285_2223"
              x="0"
              y="0"
              width="76.75"
              height="71.4926"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_285_2223"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_285_2223"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_285_2223"
              x1="4"
              y1="33"
              x2="88"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F7C53B" />
              <stop offset="0.395" stopColor="#DBC731" />
              <stop offset="0.864383" stopColor="#C08C3A" />
              <stop offset="1" stopColor="#D8C936" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_285_2223"
              x1="39.5"
              y1="6"
              x2="39.5"
              y2="59"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.190419" stopColor="#221A3E" />
              <stop offset="1" stopColor="#363769" />
            </linearGradient>
            <radialGradient
              id="paint2_radial_285_2223"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(38.375 23) rotate(90) scale(28.4926 33.2492)"
            >
              <stop stopColor="#FD8A91" />
              <stop offset="0.556254" stopColor="#FFB597" />
              <stop offset="0.784361" stopColor="#FFF1A9" />
              <stop offset="1" stopColor="#FFF1A9" />
            </radialGradient>
            <radialGradient
              id="paint3_radial_285_2223"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(38 21) scale(16 9.19495)"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="0.420244" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      ) : (
        <svg
          id="heartSVG"
          xmlns="http://www.w3.org/2000/svg"
          width="92"
          height="73"
          viewBox="0 0 92 73"
          fill="none"
          className="w-full h-full"
        >
          <g filter="url(#filter0_d_285_2222)">
            <path
              d="M4 32.5C4 14.5507 18.5507 0 36.5 0H88V65H36.5C18.5507 65 4 50.4493 4 32.5Z"
              fill="url(#paint0_linear_285_2222)"
            />
            <g filter="url(#filter1_i_285_2222)">
              <circle
                cx="39.5"
                cy="32.5"
                r="26.5"
                fill="url(#paint1_linear_285_2222)"
              />
            </g>
            <g filter="url(#filter2_i_285_2222)">
              <path
                d="M56.75 30.1719C56.75 41.6562 39.722 50.952 38.9968 51.3359C38.8057 51.4388 38.592 51.4926 38.375 51.4926C38.158 51.4926 37.9443 51.4388 37.7532 51.3359C37.028 50.952 20 41.6562 20 30.1719C20.003 27.4751 21.0757 24.8896 22.9826 22.9826C24.8896 21.0757 27.4751 20.003 30.1719 20C33.5598 20 36.526 21.4569 38.375 23.9195C40.224 21.4569 43.1902 20 46.5781 20C49.2749 20.003 51.8604 21.0757 53.7674 22.9826C55.6743 24.8896 56.747 27.4751 56.75 30.1719Z"
                fill="url(#paint2_linear_285_2222)"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_285_2222"
              x="0"
              y="0"
              width="92"
              height="73"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_285_2222"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_285_2222"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_i_285_2222"
              x="13"
              y="6"
              width="53"
              height="57"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_285_2222"
              />
            </filter>
            <filter
              id="filter2_i_285_2222"
              x="20"
              y="20"
              width="36.75"
              height="35.4926"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_285_2222"
              />
            </filter>
            <linearGradient
              id="paint0_linear_285_2222"
              x1="4"
              y1="33"
              x2="88"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F7C53B" />
              <stop offset="0.395" stopColor="#DBC731" />
              <stop offset="0.864383" stopColor="#C08C3A" />
              <stop offset="1" stopColor="#D8C936" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_285_2222"
              x1="39.5"
              y1="6"
              x2="39.5"
              y2="59"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7051F6" />
              <stop offset="1" stopColor="#56C1F9" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_285_2222"
              x1="38.375"
              y1="20"
              x2="38.375"
              y2="51.4926"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.190419" stopColor="#221A3E" />
              <stop offset="1" stopColor="#363769" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </button>
  );
};

export default FavButton;
