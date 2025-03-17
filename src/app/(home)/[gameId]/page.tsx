import GameFrame from "@/src/components/layout/GameFrame";
import { getGameById } from "@/src/lib/actions";
import React from "react";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface PageProps {
  params: {
    gameId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { gameId } = params;
  const src = await getGameById(gameId);
  console.log("Game data PAGE", src);

  return <GameFrame data={src} />;
};

export default Page;
