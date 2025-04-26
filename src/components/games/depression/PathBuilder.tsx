"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RotateCw,
} from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Tile {
  type: "empty" | "path" | "start" | "end" | "obstacle";
  rotation?: number;
  obstacleType?: "block" | "water" | "fire";
  direction?: "horizontal" | "vertical" | "both";
}

const GRID_SIZE = 8;
const GAME_TIME = 45;
const BASE_OBSTACLE_COUNT = 3;

export default function PathBuilder({ onComplete, onExit }: Props) {
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [selectedTile, setSelectedTile] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const initializeGrid = () => {
    const newGrid: Tile[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({ type: "empty", rotation: 0 }))
      );

    // Set start and end positions
    newGrid[0][0] = { type: "start", rotation: 0, direction: "both" };
    newGrid[GRID_SIZE - 1][GRID_SIZE - 1] = {
      type: "end",
      rotation: 0,
      direction: "both",
    };

    // Scale obstacles with level
    const obstacleCount = BASE_OBSTACLE_COUNT + Math.floor(level / 2);
    const obstacleTypes = ["block", "water", "fire"];

    // Add random obstacles
    for (let i = 0; i < obstacleCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        (x === 0 && y === 0) ||
        (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) ||
        newGrid[y][x].type === "obstacle"
      );

      const obstacleType = obstacleTypes[
        Math.floor(Math.random() * obstacleTypes.length)
      ] as "block" | "water" | "fire";
      newGrid[y][x] = { type: "obstacle", rotation: 0, obstacleType };
    }

    setGrid(newGrid);
    setSelectedTile(null);
  };

  useEffect(() => {
    initializeGrid();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [level]);

  const rotateTile = (x: number, y: number) => {
    if (grid[y][x].type === "empty" || grid[y][x].type === "path") {
      const newGrid = grid.map((row) => [...row]);
      const newRotation = ((newGrid[y][x].rotation || 0) + 90) % 360;

      newGrid[y][x] = {
        type: "path",
        rotation: newRotation,
        direction: "both", // Allow all connections
      };
      setGrid(newGrid);
    }
  };

  const isValidPath = (grid: Tile[][]) => {
    const visited = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(false));
    const queue = [{ x: 0, y: 0 }];
    let pathLength = 0;
    visited[0][0] = true;

    while (queue.length > 0) {
      const { x, y } = queue.shift()!;
      pathLength++;

      // If we reached the end tile
      if (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) {
        return pathLength >= 3; // Reduced minimum path length for easier gameplay
      }

      // Check adjacent cells
      const directions = [
        { dx: 1, dy: 0 }, // right
        { dx: -1, dy: 0 }, // left
        { dx: 0, dy: 1 }, // down
        { dx: 0, dy: -1 }, // up
      ];

      for (const { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < GRID_SIZE &&
          newY >= 0 &&
          newY < GRID_SIZE &&
          !visited[newY][newX] &&
          grid[newY][newX].type !== "obstacle"
        ) {
          const currentTile = grid[y][x];
          const nextTile = grid[newY][newX];

          // Simplified connection check
          if (nextTile.type === "path" || nextTile.type === "end") {
            visited[newY][newX] = true;
            queue.push({ x: newX, y: newY });
          }
        }
      }
    }

    return false;
  };

  const checkPath = () => {
    if (isValidPath(grid)) {
      const bonus = Math.floor(timeLeft / 10); // Time bonus
      setScore((prev) => prev + level + bonus);
      setLevel((prev) => prev + 1);
      setTimeLeft(GAME_TIME); // Reset timer for next level
      setTimeout(initializeGrid, 500);
    }
  };

  const handleTileClick = (x: number, y: number) => {
    if (
      grid[y][x].type === "start" ||
      grid[y][x].type === "end" ||
      grid[y][x].type === "obstacle"
    ) {
      return;
    }

    setSelectedTile({ x, y });
    rotateTile(x, y);
  };

  if (gameOver) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-xl text-white mb-4">Final Score: {score}</p>
          <Button onClick={() => onComplete(score)}>Continue</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg p-8">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="text-white text-xl">Completed Paths: {score}</div>
        <div className="text-white text-xl">Level: {level}</div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {grid.map((row, y) =>
            row.map((tile, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  tile.type === "empty"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : tile.type === "path"
                    ? "bg-blue-500"
                    : tile.type === "start"
                    ? "bg-green-500"
                    : tile.type === "end"
                    ? "bg-purple-500"
                    : tile.obstacleType === "water"
                    ? "bg-blue-700"
                    : tile.obstacleType === "fire"
                    ? "bg-red-500"
                    : "bg-gray-900"
                }`}
                onClick={() => handleTileClick(x, y)}
                style={{
                  transform: `rotate(${tile.rotation || 0}deg)`,
                }}
              >
                {tile.type === "path" && (
                  <div className="w-8 h-2 bg-white rounded-full" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            onClick={checkPath}
            className="bg-green-500 hover:bg-green-600"
          >
            Check Path
          </Button>
          <Button
            onClick={() => initializeGrid()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Reset Level
          </Button>
        </div>
      </div>
    </div>
  );
}
