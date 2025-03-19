"use client";
import React, { useEffect, useState } from "react";
import { CarouselItem, Carousel, CarouselContent } from "../ui/carousel";
import FeaturedGameCard from "./FeaturedGameCard";
import GameCard from "./GameCard";
import Autoplay from "embla-carousel-autoplay";
import Modal from "../ui/Modal";
import Maintenance from "../ui/Maintenance";
import { Data, Game } from "@/src/lib/types";

interface GamesGridProps {
  favgame: { _id: string }[];
  data: Data;
  category: string;
  handleFetchGames: (category: string) => void; // Updated type to match the actual function signature
}

const GamesGrid: React.FC<GamesGridProps> = ({
  favgame,
  data,
  category,
  handleFetchGames,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    if (data?.isUnderMaintenance === true) {
      setOpen(true);
    }
  }, [data]);

  const { featured = [], others = [] } = data || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (selectedIndex: number) => {
    setCurrentSlide(selectedIndex);
  };

  const chunkArray = (array: Game[] | undefined, chunkSize: number) => {
    if (!array) return [];
    const chunks: Game[][] = [];

    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array?.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const mergedArray = others;

  // Create chunks for the slides after the first one
  const remainingChunks = chunkArray(
    mergedArray?.slice(category === "all" ? 6 : 8),
    8
  );

  useEffect(() => {
    setOpen(false);
    handleFetchGames(category);
  }, [reload]);

  return (
    <>
      <CarouselItem className="flex justify-center gap-x-[3vw] m-auto">
        {featured?.length > 0 && category === "all" && (
          <div className="w-[23%]  h-auto py-[3%]">
            <div className="w-[95%] h-full">
              <div className="rounded-[0.9vw] w-full h-full">
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 2000,
                        stopOnInteraction: false,
                      }),
                    ]}
                    className="h-full rounded-[1vw] "
                    onSlideChange={handleSlideChange}
                  >
                    <CarouselContent className="h-full rounded-[1vw]">
                      {featured?.map((game, index) => (
                        <CarouselItem key={index}>
                          <FeaturedGameCard src={game} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
            </div>
          </div>
        )}
        {category === "all" ? (
          <div className="grid grid-cols-3 portrait:gap-y-[3vw] portrait:gap-x-[5vw] landscape:gap-y-[3vh] landscape:gap-x-[6vh] sm:min-h-[30vw] min-h-[66.5vw]  w-[58%] py-[3%]">
            {mergedArray?.slice(0, 6).map((game, index) => (
              <GameCard
                favgame={favgame}
                key={index}
                src={game}
                type={game.type}
                index={index+1} 
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4  portrait:gap-y-[3vw] portrait:gap-x-[5vw] landscape:gap-y-[3vh] landscape:gap-x-[6vh] w-[77%] sm:min-h-[36vw] min-h-[66.5vw] py-[3%]">
            {mergedArray?.slice(0, 8).map((game, index) => (
              <GameCard
                favgame={favgame}
                key={index}
                src={game}
                type={game.type}
              />
            ))}
          </div>
        )}
      </CarouselItem>
      {remainingChunks?.map((chunk, chunkIndex) => (
        <CarouselItem key={chunkIndex}>
          <div className="grid grid-cols-4  portrait:gap-y-[3vw] portrait:gap-x-[5vw] landscape:gap-y-[3vh] landscape:gap-x-[6vh] w-[78%] py-[3%] m-auto">
            {chunk?.map((game, index) => (
              <GameCard
                favgame={favgame}
                key={index}
                src={game}
                type={game.type}
              />
            ))}
          </div>
        </CarouselItem>
      ))}
      <Modal
        isOpen={open}
        setOpen={setOpen}
        modalType="Maintenance"
        disableClose={true}
      >
        <Maintenance
          data={{ availableAt: data.availableAt || "" }}
          reload={reload}
          setReload={setReload}
        />{" "}
      </Modal>
    </>
  );
};

export default GamesGrid;
