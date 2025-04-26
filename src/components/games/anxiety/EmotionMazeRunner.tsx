"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Cell {
  type: "wall" | "path" | "player" | "exit" | "emotion";
  emotion?: string;
}

const GRID_ROWS = 6;
const GRID_COLUMNS = 10;
const GAME_TIME = 45;
const EMOTIONS = ["😊", "😢", "😠", "😨", "😂", "😍", "😎", "🤔", "😴", "🤩"];
const MIN_EMOTIONS_TO_WIN = EMOTIONS.length;

export default function EmotionMazeRunner({ onComplete, onExit }: Props) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [collectedEmotions, setCollectedEmotions] = useState<string[]>([]);

  const initializeGrid = () => {
    // Create empty grid with all paths
    const newGrid: Cell[][] = Array(GRID_ROWS)
      .fill(null)
      .map(() =>
        Array(GRID_COLUMNS)
          .fill(null)
          .map(() => ({ type: "path" }))
      );

    // Create simpler maze pattern with more open paths
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLUMNS; x++) {
        // Skip start and exit positions
        if (
          (x === 0 && y === 0) ||
          (x === GRID_COLUMNS - 1 && y === GRID_ROWS - 1)
        ) {
          continue;
        }

        // Create fewer walls for better accessibility
        if (
          (y % 3 === 1 && x % 4 === 1) || // More spaced out walls
          (y === 2 && x > 4 && x < GRID_COLUMNS - 4) // Some horizontal barriers
        ) {
          newGrid[y][x].type = "wall";
        }
      }
    }

    // Ensure clear paths
    // Horizontal corridors
    for (let y = 0; y < GRID_ROWS; y += 2) {
      for (let x = 0; x < GRID_COLUMNS; x++) {
        newGrid[y][x].type = "path";
      }
    }

    // Vertical corridors
    for (let x = 0; x < GRID_COLUMNS; x += 3) {
      for (let y = 0; y < GRID_ROWS; y++) {
        newGrid[y][x].type = "path";
      }
    }

    // Define possible emotion positions (only on path cells)
    const possiblePositions = [];
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLUMNS; x++) {
        // Skip start, exit, and their immediate neighbors
        if (
          (x === 0 && y === 0) ||
          (x === GRID_COLUMNS - 1 && y === GRID_ROWS - 1) ||
          (x === 1 && y === 0) ||
          (x === 0 && y === 1) ||
          (x === GRID_COLUMNS - 2 && y === GRID_ROWS - 1) ||
          (x === GRID_COLUMNS - 1 && y === GRID_ROWS - 2)
        ) {
          continue;
        }
        if (newGrid[y][x].type === "path") {
          possiblePositions.push({ x, y });
        }
      }
    }

    // Randomly select positions for emotions
    const shuffledEmotions = [...EMOTIONS].sort(() => Math.random() - 0.5);
    const selectedPositions = possiblePositions
      .sort(() => Math.random() - 0.5)
      .slice(0, EMOTIONS.length);

    // Place emotions
    shuffledEmotions.forEach((emotion, index) => {
      const pos = selectedPositions[index];
      newGrid[pos.y][pos.x].type = "emotion";
      newGrid[pos.y][pos.x].emotion = emotion;
    });

    // Set player and exit
    newGrid[0][0].type = "player";
    newGrid[GRID_ROWS - 1][GRID_COLUMNS - 1].type = "exit";

    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });

    // Set initial target emotion
    setCurrentEmotion(shuffledEmotions[0]);
    setCollectedEmotions([]);
  };

  const submitGameProgress = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const lastPlayDate = localStorage.getItem("lastPlayDate");
    let streak = 1;

    if (lastPlayDate) {
      const lastDate = new Date(lastPlayDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        lastDate.toISOString().split("T")[0] ===
        yesterday.toISOString().split("T")[0]
      ) {
        streak = parseInt(localStorage.getItem("streak") || "1") + 1;
      } else if (lastDate.toISOString().split("T")[0] !== currentDate) {
        streak = 1;
      }
    }

    localStorage.setItem("lastPlayDate", currentDate);
    localStorage.setItem("streak", streak.toString());

    const gameProgress = {
      gameId: "EMOTION_MAZE",
      score: score,
      completion: true,
      timeSpent: GAME_TIME - timeLeft,
      difficulty: "Easy",
      streak: streak,
      retries: score,
      frustrationScore: Math.max(0, score - 10),
    };

    console.log("Submitting game progress:", gameProgress);

    try {
      const response = await fetch("/api/games/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameProgress),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit game progress: ${errorText}`);
      }

      const result = await response.json();
      console.log("Game progress submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting game progress:", error);
      alert("Error saving progress. Please try again later.");
    }
  };

  useEffect(() => {
    initializeGrid();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          submitGameProgress();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const movePlayer = (dx: number, dy: number) => {
    if (gameOver) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (
      newX >= 0 &&
      newX < GRID_COLUMNS &&
      newY >= 0 &&
      newY < GRID_ROWS &&
      grid[newY][newX].type !== "wall"
    ) {
      // Check if trying to cross wrong emotion
      if (
        grid[newY][newX].type === "emotion" &&
        grid[newY][newX].emotion !== currentEmotion
      ) {
        return; // Prevent moving onto wrong emotion
      }

      // Create a deep copy of the grid
      const newGrid = JSON.parse(JSON.stringify(grid));

      // Handle emotion collection
      if (grid[newY][newX].type === "emotion") {
        const emotionAtCell = grid[newY][newX].emotion;

        if (emotionAtCell === currentEmotion) {
          // Increment score
          setScore((prev) => prev + 1);

          // Add to collected emotions
          const newCollectedEmotions = [...collectedEmotions, currentEmotion];
          setCollectedEmotions(newCollectedEmotions);

          // Update the remaining emotions list
          const remainingEmotions = EMOTIONS.filter(
            (e) => !newCollectedEmotions.includes(e)
          );

          // Set next target emotion or exit message
          if (remainingEmotions.length > 0) {
            const nextEmotion =
              remainingEmotions[
                Math.floor(Math.random() * remainingEmotions.length)
              ];
            setCurrentEmotion(nextEmotion);
          } else {
            setCurrentEmotion("🚪 EXIT"); // Show exit message when all emotions collected
          }

          // Clear the emotion from the cell
          newGrid[newY][newX] = { type: "path" };
        }
      }

      // Handle exit condition
      if (
        grid[newY][newX].type === "exit" &&
        collectedEmotions.length >= MIN_EMOTIONS_TO_WIN
      ) {
        setGameOver(true);
      } else if (
        grid[newY][newX].type === "exit" &&
        collectedEmotions.length < MIN_EMOTIONS_TO_WIN
      ) {
        return; // Prevent moving to exit before collecting all emotions
      }

      // Update player position in grid
      newGrid[playerPos.y][playerPos.x] = { type: "path" };
      newGrid[newY][newX] = { type: "player" };

      // Update state
      setGrid(newGrid);
      setPlayerPos({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, grid, gameOver, currentEmotion, collectedEmotions]);

  // Remove the debug useEffect that was causing reinitialization
  // This was likely causing the player to return to original position
  useEffect(() => {
    if (grid.length > 0) {
      // Count emotions in the grid
      let emotionCount = 0;
      let emotionsFound = false;

      // Only check if we need to reinitialize on first render
      if (!emotionsFound) {
        for (let y = 0; y < GRID_ROWS; y++) {
          for (let x = 0; x < GRID_COLUMNS; x++) {
            if (grid[y][x].type === "emotion") {
              emotionCount++;
            }
          }
        }

        emotionsFound = true;

        // If emotions are missing on first render, reinitialize
        if (emotionCount < EMOTIONS.length) {
          console.log("Reinitializing grid due to missing emotions");
          initializeGrid();
        }
      }
    }
  }, []);

  if (gameOver) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-xl text-white mb-4">Final Score: {score}</p>
          <Button onClick={() => onComplete(score)}>Continue</Button>
          <Button onClick={onExit} className="mt-4">
            Exit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="text-white text-xl">Score: {score}</div>
        <div className="text-white text-xl">Find: {currentEmotion}</div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-10 gap-1">
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-12 h-12 flex items-center justify-center rounded ${
                  cell.type === "wall"
                    ? "bg-gray-700"
                    : cell.type === "player"
                    ? "bg-green-500"
                    : cell.type === "exit"
                    ? "bg-purple-500"
                    : "bg-gray-600"
                }`}
              >
                {cell.type === "emotion" && cell.emotion}
                {cell.type === "player" && "🏃"}
                {cell.type === "exit" && "🚪"}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex gap-2 items-center">
          <span className="text-white">Collected:</span>
          {collectedEmotions.map((emotion, index) => (
            <span key={index} className="text-2xl">
              {emotion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
