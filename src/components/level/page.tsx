"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Shield, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WrongAnswerDialog } from "@/components/ui/wrong-answer-dialog";

interface Challenge {
  situation: string;
  options: string[];
  correct: string[];
  explanation: string;
}

interface LevelProps {
  title: string;
  challenges: Challenge[];
}

const Level: React.FC<LevelProps> = ({ title, challenges }) => {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [barriers, setBarriers] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [wrongAnswerExplanation, setWrongAnswerExplanation] = useState("");

  const handleChoice = (choice: string) => {
    if (isCompleted) return;
    console.log(values);

    if (challenges[currentChallenge].correct.includes(choice)) {
      setValues((prev) => [...prev, choice]);
      setBarriers((prev) => [...prev, choice]);
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        setShowEducation(true);
        localStorage.setItem(`${title}_completed`, "true");
      }
    } else {
      const explanation = challenges[currentChallenge].explanation;
      setWrongAnswerExplanation(explanation);
      setShowWrongAnswer(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <Link
        href="/"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft className="mr-2" /> Back to Menu
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <Shield className="text-blue-400 w-8 h-8" />
            <div className="text-xl">Barriers Built: {barriers.length}</div>
          </div>
        </div>

        <Card className="bg-gray-800 p-8 border-gray-700 mb-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              Challenge {currentChallenge + 1}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {challenges[currentChallenge].situation}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges[currentChallenge].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleChoice(option)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isCompleted}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Button
          variant="outline"
          onClick={() => setShowHint(true)}
          className="bg-transparent border-gray-600"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          Need Help?
        </Button>
      </div>

      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Building Resilience Tips</DialogTitle>
            <DialogDescription className="text-gray-300">
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Think about long-term consequences</li>
                <li>Honesty and directness often work best</li>
                <li>Active coping strategies are better than avoidance</li>
                <li>Your health and recovery come first</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showEducation}
        onOpenChange={(open) => {
          setShowEducation(open);
          if (!open) router.push("/rehab");
        }}
      >
        <WrongAnswerDialog
          open={showWrongAnswer}
          onClose={() => setShowWrongAnswer(false)}
          explanation={wrongAnswerExplanation || "No explanation available."}
        />

        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">
              Level Complete: Building Your Defense
            </DialogTitle>
            <DialogDescription className="text-gray-300 space-y-4">
              <p>You've learned valuable strategies for building resilience:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Environmental changes reduce exposure to triggers</li>
                <li>Honest communication strengthens relationships</li>
                <li>Healthy coping mechanisms build long-term resilience</li>
                <li>Each barrier you build makes you stronger</li>
              </ul>
              <div className="mt-6">
                <Button
                  onClick={() => router.push("/rehab")}
                  className="w-full"
                >
                  Continue to Next Level
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Level;
