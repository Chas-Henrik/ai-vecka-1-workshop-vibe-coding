
'use client'

import GameBoard from "@/components/GameBoard";
import Leaderboard from "@/components/Leaderboard";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-8">
      <div className="absolute top-4 right-4">
        {session ? (
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded">
              Register
            </Link>
          </div>
        )}
      </div>
      <h1 className="text-4xl font-bold">Minesweeper</h1>
      <GameBoard />
      <Leaderboard />
    </main>
  );
}