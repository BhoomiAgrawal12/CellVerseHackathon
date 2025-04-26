"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Grid, Puzzle, Zap, Trophy, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import ColorRush from "@/components/games/depression/ColorRush";
import WordSprint from "@/components/games/depression/WordSprint";
import TreasureHunt from "@/components/games/depression/TreasureHunt";
import PathBuilder from "@/components/games/depression/PathBuilder";
import ShadowChase from "@/components/games/depression/ShadowChase";
import { GameState, GameProgress } from "@/lib/types";

const PASSING_SCORE = 1;

const games = [
  {
    level: 1,
    title: "Color Rush",
    description: "Test your reaction time with fast-changing color prompts",
    icon: Target,
    color: "bg-pink-500",
    textColor: "text-pink-500",
    component: ColorRush,
  },
  {
    level: 2,
    title: "Word Sprint",
    description: "Form words from scrambled letters against the clock",
    icon: Grid,
    color: "bg-purple-500",
    textColor: "text-purple-500",
    component: WordSprint,
  },
  {
    level: 3,
    title: "Treasure Hunt",
    description: "Solve puzzles to discover hidden treasures",
    icon: Brain,
    color: "bg-blue-500",
    textColor: "text-blue-500",
    component: TreasureHunt,
  },
  {
    level: 4,
    title: "Path Builder",
    description: "Connect tiles to create the perfect path",
    icon: Puzzle,
    color: "bg-green-500",
    textColor: "text-green-500",
    component: PathBuilder,
  },
  {
    level: 5,
    title: "Shadow Chase",
    description: "Outrun the shadows and collect light orbs",
    icon: Zap,
    color: "bg-orange-500",
    textColor: "text-orange-500",
    component: ShadowChase,
  },
];

const initialGameState: GameState = {
  currentLevel: 1,
  progress: {},
  highestUnlockedLevel: 1,
};

export default function NewGames() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("newGameState");
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  const saveProgress = (newState: GameState) => {
    localStorage.setItem("newGameState", JSON.stringify(newState));
    setGameState(newState);
  };

  const handleGameComplete = (score: number) => {
    const completed = score >= PASSING_SCORE;
    const newProgress: GameProgress = {
      level: selectedGame!,
      score,
      completed,
    };

    const newState = {
      ...gameState,
      progress: {
        ...gameState.progress,
        [selectedGame!]: newProgress,
      },
      highestUnlockedLevel: completed
        ? Math.max(gameState.highestUnlockedLevel, selectedGame! + 1)
        : gameState.highestUnlockedLevel,
    };

    saveProgress(newState);
    setIsPlaying(false);
  };

  const startGame = (level: number) => {
    if (level <= gameState.highestUnlockedLevel) {
      setSelectedGame(level);
      setIsPlaying(true);
    }
  };

  const GameComponent = selectedGame
    ? games.find((g) => g.level === selectedGame)?.component
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            New Brain Training Games
          </h1>
          <p className="text-gray-300 text-lg">
            Challenge yourself with our latest cognitive exercises
          </p>
          {/* <Button
            className="mt-4 bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => (window.location.href = "/")}
          >
            Back to Classic Games
          </Button> */}
        </div>

        {isPlaying && GameComponent ? (
          <GameComponent
            onComplete={handleGameComplete}
            onExit={() => setIsPlaying(false)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => {
              const progress = gameState.progress[game.level];
              const isUnlocked = game.level <= gameState.highestUnlockedLevel;

              return (
                <Card
                  key={game.level}
                  className={cn(
                    "group transition-all duration-300 hover:scale-105 cursor-pointer border-none",
                    selectedGame === game.level ? "ring-2 ring-white" : "",
                    !isUnlocked && "opacity-50"
                  )}
                  onClick={() => isUnlocked && setSelectedGame(game.level)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-lg", game.color)}>
                        {!isUnlocked ? (
                          <Lock className="w-6 h-6 text-white" />
                        ) : (
                          <game.icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl   text-white transition-colors">
                          Level {game.level}: {game.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {game.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progress?.completed && (
                        <div className="flex items-center gap-2 text-yellow-500">
                          <Trophy className="w-4 h-4" />
                          <span>Completed! Score: {progress.score}</span>
                        </div>
                      )}
                      <Button
                        className={cn(
                          "w-full transition-colors",
                          game.color,
                          "hover:opacity-90 text-white"
                        )}
                        onClick={() => startGame(game.level)}
                        disabled={!isUnlocked}
                      >
                        {!isUnlocked ? "Locked" : "Start Game"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {selectedGame && !isPlaying && (
          <div className="mt-8 text-center">
            <Button
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => setSelectedGame(null)}
            >
              Back to Games
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
