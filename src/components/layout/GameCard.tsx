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
        className="h-[33vw] sm:h-[16vw] gamecar relative z-[2]"
      >
        <FavButton favgame={favgame} id={src?._id} />
        <GameCardImg src={src?.thumbnail} type={type} />
        {/* Frame Image */}
        <Image
          src="/assets/images/game-frame.png"
          fill
          className=" z-[999] object-fit"
          alt="game-frame"
        />
      </Link>
    </>
  );
};

export default GameCard;
