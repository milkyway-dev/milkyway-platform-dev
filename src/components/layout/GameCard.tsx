import FavButton from "../ui/FavButton";
import Link from "next/link";
import GameCardImg from "./GameCardImg";
import Image from "next/image";

interface GameCardProps {
  favgame: { _id: string }[]; // Array of favorite game IDs
  index?: number,
  src: {
    _id: string;
    slug: string;
    thumbnail: string;
  };
  type: string; // Type of the game (e.g., category or other relevant type)
}
const GameCard: React.FC<GameCardProps> = ({ index,favgame, src, type }) => {
  return (
    <>
      <Link
        href={`/${src.slug}`}
        className="h-[35vw] sm:h-[17.5vw] hover:scale-95  transition-all gamecar relative z-[2]"
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
