import Image from "next/image";
import React from "react";
import Link from "next/link";

interface FeaturedGameCardProps {
  src: {
    slug: string;
    thumbnail: string;
  };
}

const FeaturedGameCard: React.FC<FeaturedGameCardProps> = ({ src }) => {
  return (
    <Link href={`/${src.slug}`}>
      <div className="relative  rounded-[1vw]  w-full h-full">
      <Image
          src={'/assets/images/featured-frame.png'}
          fill
          className="w-full h-full z-50 rounded-[1vw]"
          alt={'featured-frame'}
        />
        <Image
          src={src.thumbnail}
          fill
          className=" w-full  h-full   landscape:rounded-[4vw] landscape:py-[.5vw] portrait:rounded-[4vh] portrait:py-[.5vh] object-cover"
          alt={src.slug}
        />
      </div>
    </Link>
  );
};

export default FeaturedGameCard;
