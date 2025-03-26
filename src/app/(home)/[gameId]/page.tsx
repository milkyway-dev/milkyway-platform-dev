'use client';

import GameFrame from "@/src/components/layout/GameFrame";
import { getGameById } from "@/src/lib/actions";
import { useSocket } from "@/src/lib/context/Socket";
import { Events } from "@/src/lib/utils";
import React, { useEffect, useState } from "react";


interface PageProps {
  params: {
    gameId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { gameId } = params;
const socket = useSocket();
const [gameData, setGameData] = useState<{ url?: string; message?: string } | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
  if (!socket || !socket.connected  ||!gameId) return;

  socket.emit(Events.PLAYGROUND_GAME_URL, { slug: gameId }, (res: any) => {
    setLoading(false);
    if (res.success) {
      setGameData({ url: res.data.url });
    } else {
      setGameData({ message: res.message });
    }
  });
}, [socket, gameId]);

if (loading) return <p className="text-center">Loading game...</p>;
if (!gameData) return <p className="text-center text-red-500">Something went wrong.</p>;

return <GameFrame data={gameData} />;
};

export default Page;