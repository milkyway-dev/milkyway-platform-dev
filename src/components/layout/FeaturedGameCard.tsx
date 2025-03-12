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
          className=" w-full h-full z-50  rounded-[1vw]"
          alt={'featured-frame'}
        />
        <Image
          src={src?.thumbnail}
          fill
          className=" w-full portrait:py-[.3vh] landscape:py-[.3vw] h-full object-cover portrait:rounded-[2.7vh] landscape:rounded-[2.7vw]"
          alt={src.slug}
        />
      </div>
    </Link>
  );
};

export default FeaturedGameCard;
