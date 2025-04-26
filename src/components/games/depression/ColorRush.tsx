"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const COLORS = [
  { name: "Red", bg: "bg-red-500" },
  { name: "Blue", bg: "bg-blue-500" },
  { name: "Green", bg: "bg-green-500" },
  { name: "Yellow", bg: "bg-yellow-500" },
  { name: "Purple", bg: "bg-purple-500" },
  { name: "Pink", bg: "bg-pink-500" },
];

const GAME_TIME = 30;
const COLOR_CHANGE_INTERVAL = 2000;

export default function ColorRush({ onComplete, onExit }: Props) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
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

    const colorTimer = setInterval(() => {
      if (!gameOver) {
        const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        setCurrentColor(newColor);
      }
    }, COLOR_CHANGE_INTERVAL);

    return () => {
      clearInterval(timer);
      clearInterval(colorTimer);
    };
  }, [gameOver]);

  const handleColorClick = (color: (typeof COLORS)[0]) => {
    if (color.name === currentColor.name) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
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
        <div className="text-white text-xl">Score: {score}</div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <div className="text-white text-xl">Streak: {streak}</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Match this color:
          </h2>
          <div
            className={`w-32 h-32 mx-auto rounded-lg ${currentColor.bg} animate-pulse`}
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {COLORS.map((color) => (
            <Button
              key={color.name}
              className={`h-24 ${color.bg} hover:opacity-90 transition-opacity`}
              onClick={() => handleColorClick(color)}
            >
              {color.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
