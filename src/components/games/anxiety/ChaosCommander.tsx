"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle, Play } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Task {
  id: number;
  type: "math" | "color" | "word";
  problem: string;
  answer: string;
  options: string[];
  timeLeft: number;
  completed: boolean;
  failed: boolean;
  difficulty: number;
}

const GAME_TIME = 45;
const INITIAL_TASK_TIME = 8;
const MIN_TASK_TIME = 4;
const MAX_ACTIVE_TASKS = 3;
const TASK_TYPES = ["math", "color", "word"] as const;
const COLORS = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
const WORDS = ["House", "Tree", "Car", "Book", "Star", "Moon", "Sun", "Fish"];

export default function ChaosCommander({ onComplete, onExit }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [taskCounter, setTaskCounter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [progressSubmitted, setProgressSubmitted] = useState(false);

  const generateTask = useCallback(
    (difficulty: number): Task => {
      const type = TASK_TYPES[Math.floor(Math.random() * TASK_TYPES.length)];
      let problem = "";
      let answer = "";
      let options: string[] = [];

      switch (type) {
        case "math":
          const num1 = Math.floor(Math.random() * (5 + difficulty));
          const num2 = Math.floor(Math.random() * (5 + difficulty));
          const operations = difficulty > 2 ? ["+", "-", "*"] : ["+", "-"];
          const operation =
            operations[Math.floor(Math.random() * operations.length)];
          problem = `${num1} ${operation} ${num2} = ?`;
          answer = String(eval(`${num1} ${operation} ${num2}`));

          // Generate wrong answers that are close to the correct answer
          const correctAnswer = parseInt(answer);
          options = [
            String(correctAnswer),
            String(correctAnswer + 1),
            String(correctAnswer - 1),
            String(correctAnswer + (difficulty > 2 ? 2 : 1)),
          ].sort(() => Math.random() - 0.5);
          break;

        case "color":
          const availableColors = COLORS.slice(0, 4 + Math.min(difficulty, 2));
          answer =
            availableColors[Math.floor(Math.random() * availableColors.length)];
          problem = `Select ${answer}`;
          options = [...availableColors].sort(() => Math.random() - 0.5);
          break;

        case "word":
          const availableWords = WORDS.slice(0, 4 + Math.min(difficulty, 4));
          answer =
            availableWords[Math.floor(Math.random() * availableWords.length)];
          problem = `Select ${answer}`;
          options = [...availableWords].sort(() => Math.random() - 0.5);
          break;
      }

      return {
        id: taskCounter,
        type,
        problem,
        answer,
        options,
        timeLeft: Math.max(
          INITIAL_TASK_TIME - Math.floor(difficulty / 2),
          MIN_TASK_TIME
        ),
        completed: false,
        failed: false,
        difficulty,
      };
    },
    [taskCounter]
  );

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setTaskCounter(0);
    setTasks([generateTask(0)]);
    setStreak(0);
  }, [generateTask]);

  useEffect(() => {
    if (!gameStarted) return;

    const gameTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          clearInterval(gameTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const taskTimer = setInterval(() => {
      setTasks((prev) => {
        const newTasks = prev.map((task) => ({
          ...task,
          timeLeft: task.timeLeft - 1,
        }));

        // Handle expired tasks
        newTasks.forEach((task) => {
          if (task.timeLeft <= 0 && !task.completed && !task.failed) {
            task.failed = true;
            setStreak(0);
          }
        });

        // Calculate current difficulty based on score and streak
        const difficulty = Math.floor(score / 5) + Math.floor(streak / 3);

        // Add new task if there's room
        const activeTasks = newTasks.filter((t) => !t.completed && !t.failed);
        if (activeTasks.length < MAX_ACTIVE_TASKS) {
          setTaskCounter((prev) => prev + 1);
          return [...newTasks, generateTask(difficulty)];
        }

        return newTasks;
      });
    }, 1000);

    return () => {
      clearInterval(gameTimer);
      clearInterval(taskTimer);
    };
  }, [gameStarted, generateTask, score, streak]);

  const handleAnswer = useCallback((taskId: number, selectedAnswer: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const correct = task.answer === selectedAnswer;
          if (correct) {
            setScore((prev) => prev + 1 + Math.floor(task.difficulty / 2));
            setStreak((prev) => prev + 1);
          } else {
            setStreak(0);
          }
          return {
            ...task,
            completed: correct,
            failed: !correct,
          };
        }
        return task;
      })
    );
  }, []);

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
      gameId: "CHAOS_COMMANDER",
      score: score,
      completion: true,
      timeSpent: GAME_TIME - timeLeft,
      difficulty: "Severe",
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

  if (!gameStarted) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white mb-4">
            Chaos Commander
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-md mx-auto">
            Complete tasks quickly and maintain your streak! Tasks get harder as
            you score higher.
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

  if (gameOver) {
    if (!progressSubmitted) {
      submitGameProgress();
      setProgressSubmitted(true);
    }
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-xl text-white mb-4">Final Score: {score}</p>
          <Button onClick={() => onComplete(score)}>Continue</Button>
          <Button onClick={onExit} className="mt-4 bg-red-500 hover:bg-red-600">
            Exit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg p-8">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="text-white text-xl">Score: {score}</div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      {/* Tasks Container with Scroll */}
      <div className="mt-16 h-[calc(80vh-8rem)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 p-2">
          {tasks
            .filter((task) => !task.completed && !task.failed)
            .slice(-MAX_ACTIVE_TASKS)
            .map((task) => (
              <div
                key={task.id}
                className={`bg-gray-800 p-4 rounded-lg border-2 ${
                  task.timeLeft <= 3
                    ? "border-red-500 animate-pulse"
                    : "border-transparent"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white text-lg font-medium">
                    {task.problem}
                  </h3>
                  <div className="flex items-center gap-2 ml-2">
                    <AlertCircle
                      className={`${
                        task.timeLeft <= 3 ? "text-red-500" : "text-yellow-500"
                      }`}
                    />
                    <span className="text-white">{task.timeLeft}s</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {task.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(task.id, option)}
                      variant="outline"
                      className={`text-base py-2 px-3 h-auto whitespace-normal ${
                        task.type === "color"
                          ? `hover:bg-${option.toLowerCase()}-500`
                          : ""
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Footer Status Icons */}
      <div className="absolute bottom-4 left-4 right-4 bg-gray-900 pt-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tasks
            .filter((task) => task.completed || task.failed)
            .slice(-5)
            .map((task) => (
              <div
                key={task.id}
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  task.completed ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <XCircle className="w-5 h-5 text-white" />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
