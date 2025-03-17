import React from "react";
import Image from "next/image";
import Games from "@/src/components/layout/Games";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { fetchGames } from "@/src/lib/actions";

const page = async () => {
  const initialGames = await fetchGames();
  const favGames = await fetchGames("fav");

  return (
    <section className="relative w-full flex flex-col justify-center overflow-hidden">
      <div className="wave-bg w-full h-full absolute top-0 left-0"></div>
      <Image
        src={"/assets/images/bg.png"}
        fill
        alt="bg"
        priority={true}
        quality={100}
        objectPosition="center"
        className="z-[-2] object-cover"
      />
        <Header />
        <Games  favgame={favGames?.others} initialGames={initialGames} />
        <Footer initialGames={initialGames}/>

      {/* Left Sugar Cane Image */}
      <Image
        src="/assets/images/suger-cane-left.png"
        alt="Sugar Cane Left"
        width={1000}
        height={1000}
        quality={100}
        className="absolute z-[-1] left-[-5%] bottom-0  w-auto h-[95%]"
      />
      {/* Right Sugar Cane Image */}
      <Image
        src="/assets/images/suger-cane-right.png"
        alt="Sugar Cane Left"
        width={1000}
        height={1000}
        quality={100}
        className="absolute z-[-1] right-[-10%] bottom-0  w-auto h-[95%] "
      />
    </section>
  );
};

export default page;
