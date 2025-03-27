import GameFrame from "@/src/components/layout/GameFrame";
import { getGameById } from "@/src/lib/actions";
import React from "react";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{ gameId: string }>; 
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params; 
  const { gameId } = resolvedParams;
  const src = await getGameById(gameId);

  return <GameFrame data={src} />;
};

export default Page;