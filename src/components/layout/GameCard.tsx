import FavButton from "../ui/FavButton";
import Link from "next/link";
import GameCardImg from "./GameCardImg";
import Image from "next/image";

interface GameCardProps {
  favgame: { _id: string }[]; // Array of favorite game IDs
  src: {
    _id: string;
    slug: string;
    thumbnail: string;
  };
  type: string; // Type of the game (e.g., category or other relevant type)
}

const GameCard: React.FC<GameCardProps> = ({ favgame, src, type }) => {
  return (
    <>
      <Link
        href={`/${src.slug}`}
        className=" h-[25vw]  sm:h-[16vw] gamecar relative z-[2]"
      >
        <FavButton favgame={favgame} id={src?._id} />
        <GameCardImg src={src?.thumbnail} type={type} />
        {/* Frame Image */}
        <Image
          src="/assets/images/game-frame.png"
          alt="Frame"
          width={1000}
          height={1000}
          quality={100}
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none object-contain"
        />
      </Link>
    </>
  );
};

export default GameCard;
