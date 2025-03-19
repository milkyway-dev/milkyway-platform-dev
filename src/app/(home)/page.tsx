import React from "react";
import Image from "next/image";
import { fetchGames } from "../../lib/actions";
import Header from "../../components/layout/Header";
import Games from "../../components/layout/Games";
import Footer from "../../components/layout/Footer";


export const fetchCache = 'force-no-store';

const Home = async () => {

  const initialGames = await fetchGames();
  const favGames = await fetchGames("fav");

  return (
    <section className="relative w-full overflow-hidden">
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
        alt="Sugare Cane Right"
        width={1000}
        height={1000}
        quality={100}
        className="absolute z-[-1] right-[-10%] bottom-0  w-auto h-[100%]"
      />
    </section>
  );
};

export default Home;
