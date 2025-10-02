
import GameBoard from "@/components/GameBoard";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-8">
      <h1 className="text-4xl font-bold">Minesweeper</h1>
      <GameBoard />
      <Leaderboard />
    </main>
  );
}