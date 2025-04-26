"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const WORDS = [
  "BRAIN",
  "FOCUS",
  "THINK",
  "SMART",
  "LEARN",
  "MIND",
  "SKILL",
  "GROW",
  "SOLVE",
  "LOGIC",
];

const INITIAL_TIME = 30;
const TIME_BONUS = 5;

export default function WordSprint({ onComplete, onExit }: Props) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isGameOverSubmitted, setIsGameOverSubmitted] = useState(false);

  const scrambleWord = (word: string) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const getNewWord = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
  };

  useEffect(() => {
    getNewWord();
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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === currentWord) {
      setScore((prev) => prev + 1);
      setTimeLeft((prev) => Math.min(prev + TIME_BONUS, INITIAL_TIME));
      setInput("");
      getNewWord();
    }
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
      gameId: "WORD_SPRINT",
      score: score,
      completion: true,
      timeSpent: INITIAL_TIME - timeLeft,
      difficulty: "mild",
      streak: streak,
      retries: score,
      frustrationScore: Math.max(0, score - 10),
    };

    try {
      const response = await fetch("/api/games/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameProgress),
      });

      if (!response.ok) {
        throw new Error("Failed to submit game progress");
      }
    } catch (error) {
      console.error("Error submitting game progress:", error);
    }
  };

  useEffect(() => {
    if (gameOver && !isGameOverSubmitted) {
      submitGameProgress();
      setIsGameOverSubmitted(true);
    }
  }, [gameOver, isGameOverSubmitted]);

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
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Unscramble the word:
          </h2>
          <div className="text-5xl font-bold text-purple-500 mb-8 tracking-wider">
            {scrambledWord}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              className="text-center text-2xl uppercase"
              maxLength={currentWord.length}
              placeholder="Type your answer"
            />
            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
