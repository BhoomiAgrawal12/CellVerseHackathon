"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Square, Play } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const COLORS = [
  { bg: "bg-red-500", hover: "hover:bg-red-600", shadow: "shadow-red-500/50" },
  {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
    shadow: "shadow-blue-500/50",
  },
  {
    bg: "bg-green-500",
    hover: "hover:bg-green-600",
    shadow: "shadow-green-500/50",
  },
  {
    bg: "bg-yellow-500",
    hover: "hover:bg-yellow-600",
    shadow: "shadow-yellow-500/50",
  },
];

const INITIAL_DISPLAY_TIME = 1000;
const GAME_TIME = 45;

export default function PatternHacker({ onComplete, onExit }: Props) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [playerPattern, setPlayerPattern] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [gameStarted, setGameStarted] = useState(false);
  const [wrongPattern, setWrongPattern] = useState(false);
  const [displayTime, setDisplayTime] = useState(INITIAL_DISPLAY_TIME);

  const resetGame = useCallback(() => {
    setPattern([]);
    setPlayerPattern([]);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setIsShowingPattern(false);
    setGameOver(false);
    setCurrentIndex(-1);
    setWrongPattern(false);
    setDisplayTime(INITIAL_DISPLAY_TIME);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameStarted(true);
    addToPattern();
  }, [resetGame]);

  const addToPattern = useCallback(() => {
    const newPattern = [...pattern, Math.floor(Math.random() * COLORS.length)];
    setPattern(newPattern);
    showPattern(newPattern);
    // Gradually decrease display time as score increases
    setDisplayTime(Math.max(INITIAL_DISPLAY_TIME - score * 50, 400));
  }, [pattern, score]);

  const showPattern = useCallback(
    (patternToShow: number[]) => {
      setIsShowingPattern(true);
      setPlayerPattern([]);
      setCurrentIndex(-1);

      let timeoutIds: NodeJS.Timeout[] = [];

      patternToShow.forEach((_, index) => {
        const showTimeout = setTimeout(() => {
          setCurrentIndex(index);
          const hideTimeout = setTimeout(() => {
            setCurrentIndex(-1);
            if (index === patternToShow.length - 1) {
              setIsShowingPattern(false);
            }
          }, displayTime / 2);
          timeoutIds.push(hideTimeout);
        }, index * displayTime);
        timeoutIds.push(showTimeout);
      });

      // Cleanup function to clear any remaining timeouts
      return () => timeoutIds.forEach((id) => clearTimeout(id));
    },
    [displayTime]
  );

  useEffect(() => {
    if (gameStarted && !gameOver) {
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
    }
  }, [gameStarted, gameOver]);

  const handleColorClick = useCallback(
    (colorIndex: number) => {
      if (isShowingPattern || gameOver || wrongPattern) return;

      const newPlayerPattern = [...playerPattern, colorIndex];
      setPlayerPattern(newPlayerPattern);

      const currentStep = newPlayerPattern.length - 1;

      // Check if the current selection is correct
      if (colorIndex !== pattern[currentStep]) {
        setWrongPattern(true);
        setPlayerPattern([]);

        setTimeout(() => {
          setWrongPattern(false);
          showPattern(pattern);
        }, 1500);
        return;
      }

      // If player completed the current pattern correctly
      if (newPlayerPattern.length === pattern.length) {
        const newScore = score + pattern.length;
        setScore(newScore);

        setTimeout(() => {
          addToPattern();
        }, 500);
      }
    },
    [
      isShowingPattern,
      gameOver,
      wrongPattern,
      playerPattern,
      pattern,
      score,
      showPattern,
      addToPattern,
    ]
  );

  // Game Over Screen
  if (gameOver) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-2xl text-white mb-4">Final Score: {score}</p>
          <Button onClick={() => onComplete(score)}>Continue</Button>
        </div>
      </div>
    );
  }

  // Start Screen
  if (!gameStarted) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white mb-4">Pattern Hacker</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-md mx-auto">
            Watch the pattern and repeat it correctly. Patterns get faster as
            you score higher!
          </p>
          <Button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-xl px-8 py-6"
          >
            <Play className="mr-2" /> Start Game
          </Button>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="text-white text-xl">Score: {score}</div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center mb-8">
          <h3 className="text-white text-xl mb-2">
            {isShowingPattern ? "Watch the pattern" : "Repeat the pattern"}
          </h3>
          <div className="flex gap-2 justify-center">
            {pattern.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  playerPattern[index] !== undefined
                    ? COLORS[playerPattern[index]].bg
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {COLORS.map((color, index) => (
            <button
              key={color.bg}
              className={`w-32 h-32 rounded-lg transition-all duration-200 ${
                currentIndex >= 0 && pattern[currentIndex] === index
                  ? color.bg
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => handleColorClick(index)}
              disabled={isShowingPattern}
            >
              <Square className="w-8 h-8 mx-auto text-white opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
