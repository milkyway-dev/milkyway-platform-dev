import React from "react";
import Image from "next/image";
import Games from "@/src/components/layout/Games";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { fetchGames } from "@/src/lib/actions";

export const fetchCache = 'force-no-store';

const Home = async () => {
  const initialGames = await fetchGames();
  const favGames = await fetchGames("fav");

  return (
    <section className="relative w-full overflow-hidden ">
      <div className="wave-bg w-full h-full absolute top-0 left-0"></div>
      <Image
        src={"/bg1.png"}
        fill
        alt="bg"
        priority={true}
        quality={100}
        objectPosition="center"
        className="z-[-2] object-cover"
      />
      <Header />
      <Games favgame={favGames?.others} initialGames={initialGames} />
      <Footer />
    </section>
  );
};

export default Home;
