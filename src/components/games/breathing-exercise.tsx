"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wind } from "lucide-react";

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        // Phase timing
        if (phase === "inhale" && progress >= 4) {
          setPhase("hold");
        } else if (phase === "hold" && progress >= 7) {
          setPhase("exhale");
        } else if (phase === "exhale" && progress >= 8) {
          setPhase("inhale");
        }

        // Calculate progress percentage
        const maxTime = phase === "inhale" ? 4 : phase === "hold" ? 7 : 8;
        setProgress((progress / maxTime) * 100);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, progress]);

  const handleStart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase("inhale");
      setProgress(0);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wind className="w-6 h-6" />
          Mindful Breathing
        </h2>
        <p className="text-muted-foreground">
          Follow the rhythm for a calming breathing exercise
        </p>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            {phase === "inhale"
              ? "Breathe In"
              : phase === "hold"
              ? "Hold"
              : "Breathe Out"}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Button
          onClick={handleStart}
          className="w-full"
          variant={isActive ? "destructive" : "default"}
        >
          {isActive ? "Stop" : "Start"} Exercise
        </Button>
      </div>
    </Card>
  );
}
