
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
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setGrid(setupGrid());
    setScore(0);
    setGameOver(false);
  };

  const submitScore = async () => {
    await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });
    alert("Score submitted!");
  };


  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    if (newGrid[index].revealed || newGrid[index].flagged) return;

    newGrid[index].revealed = true;

    if (newGrid[index].mine) {
      setScore(score - 5);
      setGameOver(true);
      alert("Game Over!");
      // Reveal all mines
      for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i].mine) {
          newGrid[i].revealed = true;
        }
      }
      setGrid(newGrid);
      return;
    }

    setScore(score + 1);

    if (newGrid[index].adjacentMines === 0) {
      // Reveal adjacent cells
      const revealAdjacent = (i: number) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;

        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
              const neighborIndex = newRow * COLS + newCol;
              if (!newGrid[neighborIndex].revealed && !newGrid[neighborIndex].flagged) {
                newGrid[neighborIndex].revealed = true;
                setScore(prevScore => prevScore + 1);
                if (newGrid[neighborIndex].adjacentMines === 0) {
                  revealAdjacent(neighborIndex);
                }
              }
            }
          }
        }
      };
      revealAdjacent(index);
    }

    // Check for win
    const revealedCount = newGrid.filter(cell => cell.revealed).length;
    if (revealedCount === ROWS * COLS - MINES) {
      setScore(score + 50);
      setGameOver(true);
      alert("You Win!");
    }

    setGrid(newGrid);
  };

  const handleCellContext = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const newGrid = [...grid];
    if (newGrid[index].revealed) return;

    newGrid[index].flagged = !newGrid[index].flagged;
    setGrid(newGrid);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Score: {score}</div>
        <div>
          {gameOver && <button onClick={submitScore} className="px-4 py-2 bg-green-500 text-white rounded mr-2">Submit Score</button>}
          <button onClick={restartGame} className="px-4 py-2 bg-blue-500 text-white rounded">Restart</button>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {grid.map((cell, index) => (
          <div key={index} onClick={() => handleCellClick(index)} onContextMenu={(e) => handleCellContext(e, index)} className={`w-8 h-8 border border-gray-500 flex justify-center items-center ${cell.revealed ? 'bg-white' : 'bg-gray-300 hover:bg-gray-400'}`}>
            {cell.revealed ? (cell.mine ? '💣' : cell.adjacentMines > 0 ? cell.adjacentMines : '') : cell.flagged ? '🚩' : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
