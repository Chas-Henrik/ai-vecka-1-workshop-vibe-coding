
'use client'

import { useState } from 'react';

const GameBoard = () => {
  const [grid, setGrid] = useState(Array(100).fill(0));

  return (
    <div className="grid grid-cols-10 gap-1">
      {grid.map((cell, index) => (
        <div key={index} className="w-8 h-8 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex justify-center items-center">
          {cell}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
