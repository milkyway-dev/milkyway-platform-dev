import GameFrame from "@/src/components/layout/GameFrame";
import { getGameById } from "@/src/lib/actions";
import React from "react";

interface PageProps {
  params: Promise<{ gameId: string }>; // Ensure it's properly awaited
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params; // Ensure params is awaited
  const { gameId } = resolvedParams;
  const src = await getGameById(gameId);

  return <GameFrame data={src} />;
};

export default Page;
