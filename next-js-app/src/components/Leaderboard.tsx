
'use client'

import { useState, useEffect } from 'react';

interface Score {
  id: number;
  value: number;
  user: {
    name: string;
  };
}

const Leaderboard = () => {
  const [highscores, setHighscores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchHighscores = async () => {
      const res = await fetch('/api/highscores');
      const data = await res.json();
      setHighscores(data.highscores);
    };
    fetchHighscores();
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Name</th>
            <th className="text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.user.name}</td>
              <td className="text-right">{score.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
