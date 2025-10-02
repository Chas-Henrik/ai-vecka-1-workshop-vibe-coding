
'use client'

import { useState, useEffect } from 'react';

const ROWS = 10;
const COLS = 10;
const MINES = 10;

const setupGrid = () => {
  const grid = Array.from({ length: ROWS * COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacentMines: 0 }));
  let minesPlaced = 0;

  while (minesPlaced < MINES) {
    const index = Math.floor(Math.random() * ROWS * COLS);
    if (!grid[index].mine) {
      grid[index] = { ...grid[index], mine: true };
      minesPlaced++;
    }
  }

  for (let i = 0; i < ROWS * COLS; i++) {
    if (!grid[i].mine) {
      let adjacentMines = 0;
      const row = Math.floor(i / COLS);
      const col = i % COLS;

      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (r === 0 && c === 0) continue;
          const newRow = row + r;
          const newCol = col + c;
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            const neighborIndex = newRow * COLS + newCol;
            if (grid[neighborIndex].mine) {
              adjacentMines++;
            }
          }
        }
      }
      grid[i] = { ...grid[i], adjacentMines };
    }
  }

  return grid;
};

const GameBoard = () => {
  const [grid, setGrid] = useState(setupGrid());

  return (
    <div className="grid grid-cols-10 gap-1">
      {grid.map((cell, index) => (
        <div key={index} className="w-8 h-8 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex justify-center items-center">
          {cell.revealed ? (cell.mine ? '💣' : cell.adjacentMines) : ''}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
