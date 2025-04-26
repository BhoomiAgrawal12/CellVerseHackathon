"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Puzzle, RefreshCw, Check } from 'lucide-react';

const PUZZLE_PIECES = [
  "Take a deep breath",
  "Notice five things you can see",
  "Focus on four things you can touch",
  "Listen for three distinct sounds",
  "Identify two scents around you",
  "Be aware of one taste in your mouth"
];

export function MindfulnessPuzzle() {
  const [currentPiece, setCurrentPiece] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(new Array(PUZZLE_PIECES.length).fill(false));
  const [timer, setTimer] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      const newCompleted = [...completed];
      newCompleted[currentPiece] = true;
      setCompleted(newCompleted);
    }
    return () => clearInterval(interval);
  }, [isActive, timer, currentPiece, completed]);

  const handleStart = () => {
    setIsActive(true);
    setTimer(30);
  };

  const handleNext = () => {
    if (currentPiece < PUZZLE_PIECES.length - 1) {
      setCurrentPiece(prev => prev + 1);
      setIsActive(false);
      setTimer(30);
    }
  };

  const handleReset = () => {
    setCurrentPiece(0);
    setCompleted(new Array(PUZZLE_PIECES.length).fill(false));
    setIsActive(false);
    setTimer(30);
  };

  const allCompleted = completed.every(Boolean);

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Puzzle className="w-6 h-6" />
          Mindfulness Puzzle
        </h2>
        <p className="text-muted-foreground">
          Complete each mindfulness exercise to solve the puzzle
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {currentPiece + 1}/{PUZZLE_PIECES.length}: {PUZZLE_PIECES[currentPiece]}
          </h3>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-mono">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
            <Button
              onClick={handleStart}
              disabled={isActive || completed[currentPiece]}
            >
              {completed[currentPiece] ? (
                <Check className="w-4 h-4 mr-2" />
              ) : null}
              {completed[currentPiece]
                ? "Completed"
                : isActive
                ? "In Progress"
                : "Start Exercise"}
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isActive}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              isActive ||
              !completed[currentPiece] ||
              currentPiece === PUZZLE_PIECES.length - 1
            }
          >
            Next Exercise
          </Button>
        </div>

        {allCompleted && (
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <h4 className="font-semibold mb-2">Congratulations!</h4>
            <p className="text-sm text-muted-foreground">
              You've completed all mindfulness exercises. Take a moment to notice how you feel.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}