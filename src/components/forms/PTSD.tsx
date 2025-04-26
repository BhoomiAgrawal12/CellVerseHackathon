import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
// import { useRouter } from "next/router";


interface Challenge {
    situation: string;
    options: {
        choice: string;
        value: number;
    }[];
    correct: string[];
    explanation: string;
}




  
export default function PTSD( challenges : Challenge[]|any) {
    // const router = useRouter();
      const [currentChallenge, setCurrentChallenge] = useState(0);
      const [isCompleted, setIsCompleted] = useState(false);

      const [values, setValues] = useState<string[]>([]);
      const [count, setCount] = useState(0);

      const handleChoice = (choice: string|any) => {
        if (isCompleted) return;
        console.log(values);
    
        if (challenges[currentChallenge].correct.includes(choice)) {
          setValues((prev) => [...prev, choice]);
          const newCount = count + challenges[currentChallenge].options[currentChallenge].value;
          setCount(newCount);
          if (currentChallenge < challenges.length - 1) {
            setCurrentChallenge((prev) => prev + 1);
          } else {
            setIsCompleted(true);
          }
        }
      };
    return (
        <Card className="bg-gray-800 p-8 border-gray-700 mb-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              Challenge {currentChallenge + 1}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {challenges[currentChallenge]?.situation}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges[currentChallenge].options.map((option: any, index: any) => (
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
    )
}