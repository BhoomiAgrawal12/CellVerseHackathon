"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Timer, Trophy } from "lucide-react";

const POSITIVE_WORDS = [
  "happy",
  "joy",
  "peace",
  "love",
  "calm",
  "brave",
  "kind",
  "hope",
  "smile",
  "laugh",
  "dream",
  "shine",
  "glow",
  "warm",
  "safe",
  "free",
];

export function WordChain() {
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [chain, setChain] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setFeedback("Time's up! Great job creating positive connections!");
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    const randomWord =
      POSITIVE_WORDS[Math.floor(Math.random() * POSITIVE_WORDS.length)];
    setCurrentWord(randomWord);
    setChain([randomWord]);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setFeedback("");
    setUserInput("");
  };

  const checkWord = () => {
    const input = userInput.toLowerCase().trim();
    if (!input) return;

    if (input[0] !== currentWord[currentWord.length - 1]) {
      setFeedback(
        `The word should start with "${currentWord[currentWord.length - 1]}"!`
      );
      return;
    }

    if (chain.includes(input)) {
      setFeedback("You already used this word!");
      return;
    }

    // Check if the word has a positive connotation (simplified check)
    if (POSITIVE_WORDS.includes(input)) {
      setScore((prev) => prev + 10);
      setCurrentWord(input);
      setChain([...chain, input]);
      setUserInput("");
      setFeedback("Great positive word!");
    } else {
      setFeedback("Try to use more positive words!");
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Positive Word Chain
        </h2>
        <p className="text-muted-foreground">
          Create a chain of positive words where each word starts with the last
          letter of the previous word
        </p>
      </div>

      {!isPlaying ? (
        <Button onClick={startGame} className="w-full">
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>{score} points</span>
            </div>
          </div>

          <Progress value={(timeLeft / 60) * 100} />

          <div className="bg-muted p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Current Word</h3>
            <p className="text-2xl font-bold">{currentWord}</p>
          </div>

          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Enter a word starting with "${
                currentWord[currentWord.length - 1]
              }"`}
              onKeyDown={(e) => e.key === "Enter" && checkWord()}
            />
            <Button onClick={checkWord}>Submit</Button>
          </div>

          {feedback && (
            <p
              className={`text-sm ${
                feedback.includes("Great") ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Word Chain:</h4>
            <p className="text-sm">{chain.join(" → ")}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
