"use client";
import Image from "next/image";
import FavButton from "./ui/FavButton";
import GameModal from "./ui/GameModal";
import { useState, useEffect } from "react";

const GameCard = ({ src, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);

  const gameOpenHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  function getToken(cookieName) {
    const cookies = document.cookie;

    const cookieArray = cookies.split(";").map((cookie) => cookie.trim());
    const cookieObject = {};
    cookieArray.forEach((cookie) => {
      const parts = cookie.split("=");
      const key = decodeURIComponent(parts[0]);
      const value = decodeURIComponent(parts.slice(1).join("="));
      cookieObject[key] = value;
    });

    return cookieObject[cookieName];
  }

  useEffect(() => {
    const handleMessage = (event) => {
      const message = event.data;
      console.log("message : ", message);

      const iframe = document.getElementById("gameIframe");
      if (message === "authToken") {
        if (iframe.contentWindow) {
          console.log("Sending to IFRAME ");

          iframe.contentWindow.postMessage(
            { type: "authToken", cookie: getToken("token") },
            `${src}`
          );
        }
      }

      if (message === "onExit") {
        router.push("/");
      }

      if (message === "OnEnter") {
        setGameLoaded(true);
        console.log("I FRAME LOADED");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <>
      <div
        className="w-full h-[27vw] sm:h-[14.5vw] gamecard relative z-[2]"
        onClick={gameOpenHandler}
      >
        <FavButton />
        <div className=" w-full h-full relative">
          <Image
            src={src.gameThumbnailUrl}
            objectFit="cover"
            fill
            className="h-full w-full z-[1] p-[1.5%] rounded-xl"
            alt="game-img"
          />
          {type ? (
            <div className="absolute top-0 left-0 z-50 w-[30%] flex items-center justify-center">
              {type === "new" ? (
                <svg
                  width="132"
                  height="78"
                  viewBox="0 0 132 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                >
                  <path
                    d="M101.855 64.1678L0 78V3C0 1.34315 1.34314 0 3 0H132L124.837 41.9574C122.851 53.5867 113.545 62.5803 101.855 64.1678Z"
                    fill="url(#paint0_linear_115_690)"
                  />
                  <g filter="url(#filter0_i_115_690)">
                    <path
                      d="M38.7983 19.063C38.7983 18.9034 38.8462 18.7757 38.9419 18.68C39.0696 18.5523 39.2132 18.4885 39.3728 18.4885H44.9261C45.0857 18.4885 45.2133 18.5523 45.3091 18.68C45.4367 18.7757 45.5006 18.9034 45.5006 19.063V51.4255C45.5006 51.5851 45.4367 51.7287 45.3091 51.8564C45.2133 51.9521 45.0857 52 44.9261 52H38.6068C38.2876 52 38.0802 51.8404 37.9844 51.5213L32.0481 32.9942C32.0162 32.8984 31.9524 32.8665 31.8566 32.8984C31.7928 32.8984 31.7609 32.9463 31.7609 33.0421L31.8087 51.4255C31.8087 51.5851 31.7449 51.7287 31.6172 51.8564C31.5215 51.9521 31.3938 52 31.2343 52H25.6809C25.5213 52 25.3777 51.9521 25.2501 51.8564C25.1543 51.7287 25.1064 51.5851 25.1064 51.4255V19.063C25.1064 18.9034 25.1543 18.7757 25.2501 18.68C25.3777 18.5523 25.5213 18.4885 25.6809 18.4885H31.9524C32.2715 18.4885 32.479 18.6481 32.5747 18.9672L38.5589 37.4943C38.5908 37.5901 38.6387 37.6379 38.7025 37.6379C38.7983 37.606 38.8462 37.5422 38.8462 37.4464L38.7983 19.063ZM67.2673 23.7067C67.2673 23.8663 67.2035 24.0099 67.0758 24.1376C66.9801 24.2333 66.8524 24.2812 66.6929 24.2812H56.6873C56.5277 24.2812 56.4479 24.361 56.4479 24.5206V32.0846C56.4479 32.2442 56.5277 32.324 56.6873 32.324H62.4321C62.5917 32.324 62.7194 32.3878 62.8151 32.5155C62.9428 32.6112 63.0066 32.7389 63.0066 32.8984V37.5422C63.0066 37.7018 62.9428 37.8454 62.8151 37.973C62.7194 38.0688 62.5917 38.1167 62.4321 38.1167H56.6873C56.5277 38.1167 56.4479 38.1965 56.4479 38.356V45.9679C56.4479 46.1275 56.5277 46.2073 56.6873 46.2073H66.6929C66.8524 46.2073 66.9801 46.2711 67.0758 46.3988C67.2035 46.4945 67.2673 46.6222 67.2673 46.7818V51.4255C67.2673 51.5851 67.2035 51.7287 67.0758 51.8564C66.9801 51.9521 66.8524 52 66.6929 52H50.2722C50.1126 52 49.969 51.9521 49.8414 51.8564C49.7456 51.7287 49.6977 51.5851 49.6977 51.4255V19.063C49.6977 18.9034 49.7456 18.7757 49.8414 18.68C49.969 18.5523 50.1126 18.4885 50.2722 18.4885H66.6929C66.8524 18.4885 66.9801 18.5523 67.0758 18.68C67.2035 18.7757 67.2673 18.9034 67.2673 19.063V23.7067ZM76.6734 52C76.3223 52 76.1149 51.8245 76.051 51.4734L69.5881 19.1109L69.5402 18.9194C69.5402 18.6321 69.7158 18.4885 70.0668 18.4885H75.9074C76.2904 18.4885 76.4978 18.664 76.5298 19.0151L79.2586 36.2496C79.2905 36.3773 79.3383 36.4411 79.4022 36.4411C79.466 36.4411 79.5139 36.3773 79.5458 36.2496L82.131 19.0151C82.1629 18.664 82.3703 18.4885 82.7533 18.4885H87.5886C87.9715 18.4885 88.179 18.664 88.2109 19.0151L91.0354 36.2496C91.0674 36.3773 91.1152 36.4411 91.1791 36.4411C91.2429 36.4411 91.2908 36.3773 91.3227 36.2496L93.7642 19.0151C93.7962 18.664 94.0036 18.4885 94.3866 18.4885H100.036C100.451 18.4885 100.626 18.696 100.562 19.1109L94.4823 51.4734C94.4504 51.8245 94.243 52 93.86 52H88.6896C88.3067 52 88.0992 51.8245 88.0673 51.4734L85.2427 33.7602C85.2108 33.6325 85.163 33.5687 85.0991 33.5687C85.0353 33.5687 84.9874 33.6325 84.9555 33.7602L82.4182 51.4734C82.3863 51.8245 82.1788 52 81.7959 52H76.6734Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_i_115_690"
                      x="25.1064"
                      y="18.4885"
                      width="75.5516"
                      height="37.5115"
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
                        result="effect1_innerShadow_115_690"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_115_690"
                      x1="0"
                      y1="0"
                      x2="132"
                      y2="78"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#00E500" />
                      <stop offset="1" stopColor="#029802" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="132"
                  height="78"
                  viewBox="0 0 132 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                >
                  <path
                    d="M101.855 64.1678L0 78V3C0 1.34315 1.34314 0 3 0H132L124.837 41.9574C122.851 53.5867 113.545 62.5803 101.855 64.1678Z"
                    fill="url(#paint0_linear_115_706)"
                  />
                  <g filter="url(#filter0_i_115_706)">
                    <path
                      d="M39.1227 19.063C39.1227 18.9034 39.1706 18.7757 39.2663 18.68C39.394 18.5523 39.5376 18.4885 39.6972 18.4885H45.2984C45.458 18.4885 45.5856 18.5523 45.6814 18.68C45.809 18.7757 45.8729 18.9034 45.8729 19.063V51.4255C45.8729 51.5851 45.809 51.7287 45.6814 51.8564C45.5856 51.9521 45.458 52 45.2984 52H39.6972C39.5376 52 39.394 51.9521 39.2663 51.8564C39.1706 51.7287 39.1227 51.5851 39.1227 51.4255V38.356C39.1227 38.1965 39.0429 38.1167 38.8833 38.1167H34.096C33.9364 38.1167 33.8566 38.1965 33.8566 38.356V51.4255C33.8566 51.5851 33.7928 51.7287 33.6651 51.8564C33.5694 51.9521 33.4417 52 33.2821 52H27.6809C27.5213 52 27.3777 51.9521 27.2501 51.8564C27.1543 51.7287 27.1064 51.5851 27.1064 51.4255V19.063C27.1064 18.9034 27.1543 18.7757 27.2501 18.68C27.3777 18.5523 27.5213 18.4885 27.6809 18.4885H33.2821C33.4417 18.4885 33.5694 18.5523 33.6651 18.68C33.7928 18.7757 33.8566 18.9034 33.8566 19.063V32.0846C33.8566 32.2442 33.9364 32.324 34.096 32.324H38.8833C39.0429 32.324 39.1227 32.2442 39.1227 32.0846V19.063ZM59.2999 52.383C56.3637 52.383 54.0179 51.5213 52.2625 49.7978C50.5071 48.0744 49.6295 45.7764 49.6295 42.904V27.5845C49.6295 24.7121 50.5071 22.4141 52.2625 20.6907C54.0179 18.9672 56.3637 18.1055 59.2999 18.1055C62.2362 18.1055 64.582 18.9672 66.3373 20.6907C68.1246 22.4141 69.0183 24.7121 69.0183 27.5845V42.904C69.0183 45.7764 68.1246 48.0744 66.3373 49.7978C64.582 51.5213 62.2362 52.383 59.2999 52.383ZM59.2999 46.5903C60.1936 46.5903 60.9117 46.2871 61.4542 45.6807C61.9968 45.0424 62.2681 44.2126 62.2681 43.1913V27.2972C62.2681 26.2759 61.9968 25.4621 61.4542 24.8557C60.9117 24.2174 60.1936 23.8982 59.2999 23.8982C58.4063 23.8982 57.6882 24.2174 57.1456 24.8557C56.635 25.4621 56.3796 26.2759 56.3796 27.2972V43.1913C56.3796 44.2126 56.635 45.0424 57.1456 45.6807C57.6882 46.2871 58.4063 46.5903 59.2999 46.5903ZM91.3109 18.4885C91.4705 18.4885 91.5981 18.5523 91.6939 18.68C91.8215 18.7757 91.8854 18.9034 91.8854 19.063V23.7067C91.8854 23.8663 91.8215 24.0099 91.6939 24.1376C91.5981 24.2333 91.4705 24.2812 91.3109 24.2812H85.3267C85.1671 24.2812 85.0873 24.361 85.0873 24.5206V51.4255C85.0873 51.5851 85.0235 51.7287 84.8958 51.8564C84.8001 51.9521 84.6724 52 84.5128 52H78.9116C78.752 52 78.6084 51.9521 78.4808 51.8564C78.385 51.7287 78.3371 51.5851 78.3371 51.4255V24.5206C78.3371 24.361 78.2574 24.2812 78.0978 24.2812H72.3529C72.1934 24.2812 72.0497 24.2333 71.9221 24.1376C71.8263 24.0099 71.7785 23.8663 71.7785 23.7067V19.063C71.7785 18.9034 71.8263 18.7757 71.9221 18.68C72.0497 18.5523 72.1934 18.4885 72.3529 18.4885H91.3109Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_i_115_706"
                      x="27.1064"
                      y="18.1055"
                      width="64.7789"
                      height="38.2775"
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
                        result="effect1_innerShadow_115_706"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_115_706"
                      x1="0"
                      y1="0"
                      x2="132"
                      y2="78"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FA805F" />
                      <stop offset="1" stopColor="#E12D7C" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <GameModal
        show={isModalOpen}
        onClose={closeModalHandler}
        src={src.gameHostLink}
        gameLoaded={gameLoaded}
        setGameLoaded={setGameLoaded}
      />
    </>
  );
};

export default GameCard;
