"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gem, X, Check, Star, Heart, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Puzzle {
  question: string;
  options: string[];
  answer: string;
}

interface TreasureItem {
  icon: React.ReactNode;
  message: string;
  points: number;
}

interface Obstacle {
  x: number;
  y: number;
  pattern: "horizontal" | "vertical" | "circular";
}

interface PowerUp {
  x: number;
  y: number;
  type: "speed" | "shield" | "time";
  active: boolean;
}

const TREASURE_ITEMS: TreasureItem[] = [
  {
    icon: <Heart className="w-12 h-12 text-pink-500" />,
    message: "Self-Love: Take a moment to appreciate yourself.",
    points: 15,
  },
  {
    icon: <Star className="w-12 h-12 text-yellow-500" />,
    message: "Achievement: Remember a recent accomplishment.",
    points: 20,
  },
  {
    icon: <Sun className="w-12 h-12 text-orange-500" />,
    message: "Gratitude: Name something you're thankful for.",
    points: 25,
  },
  {
    icon: <Gem className="w-12 h-12 text-purple-500" />,
    message: "Strength: Recall a challenge you overcame.",
    points: 30,
  },
];

const PUZZLES: Puzzle[] = [
  {
    question:
      "What has keys but no locks, space but no room, and you can enter but not go in?",
    options: ["Keyboard", "Map", "Phone", "Book"],
    answer: "Keyboard",
  },
  {
    question: "What gets wetter and wetter the more it dries?",
    options: ["Sponge", "Towel", "Paper", "Sand"],
    answer: "Towel",
  },
  {
    question: "What has a head and a tail but no body?",
    options: ["Snake", "Coin", "River", "Rope"],
    answer: "Coin",
  },
  {
    question:
      "What has cities, but no houses; forests, but no trees; and rivers, but no water?",
    options: ["Globe", "Map", "Picture", "Book"],
    answer: "Map",
  },
];

const GAME_TIME = 60;

export default function TreasureHunt({ onComplete, onExit }: Props) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [collectedTreasures, setCollectedTreasures] = useState<number[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<TreasureItem | null>(
    null
  );
  const [obstacles, setObstacles] = useState<Obstacle[]>([
    { x: 150, y: 100, pattern: "horizontal" },
    { x: 300, y: 200, pattern: "vertical" },
    { x: 450, y: 300, pattern: "circular" },
    { x: 200, y: 150, pattern: "horizontal" },
    { x: 350, y: 250, pattern: "vertical" },
    { x: 400, y: 150, pattern: "circular" },
    { x: 250, y: 300, pattern: "horizontal" },
    { x: 500, y: 200, pattern: "vertical" },
  ]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    { x: 150, y: 150, type: "speed", active: true },
    { x: 450, y: 250, type: "shield", active: true },
    { x: 300, y: 350, type: "time", active: true },
  ]);
  const [playerSpeed, setPlayerSpeed] = useState(1);
  const [hasShield, setHasShield] = useState(false);
  const [lives, setLives] = useState(3);

  // Check for treasure collection when position changes
  useEffect(() => {
    checkTreasureCollection();
  }, [currentPosition]);

  // Timer
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

    return () => clearInterval(timer);
  }, []);

  // Replace the existing obstacle movement useEffect with this improved version
  useEffect(() => {
    let startTime = Date.now();

    const moveObstacles = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      setObstacles((prev) =>
        prev.map((obstacle) => {
          switch (obstacle.pattern) {
            case "horizontal":
              return {
                ...obstacle,
                x: 300 + Math.sin(elapsed) * 200, // Moves left-right around center
                y: obstacle.y,
              };
            case "vertical":
              return {
                ...obstacle,
                x: obstacle.x,
                y: 200 + Math.cos(elapsed) * 150, // Moves up-down around center
              };
            case "circular":
              return {
                ...obstacle,
                x: 300 + Math.cos(elapsed) * 150, // Circle motion
                y: 200 + Math.sin(elapsed) * 150, // Circle motion
              };
          }
        })
      );
    }, 16); // Smoother animation with 60fps

    return () => clearInterval(moveObstacles);
  }, []);

  const checkTreasureCollection = () => {
    TREASURE_ITEMS.forEach((treasure, index) => {
      if (collectedTreasures.includes(index)) return;

      const treasurePos = getTreasurePosition(index);
      const distance = Math.sqrt(
        Math.pow(currentPosition.x * 60 + 300 - treasurePos.x, 2) +
          Math.pow(currentPosition.y * 60 + 200 - treasurePos.y, 2)
      );

      if (distance < 40) {
        // Collection radius
        setCollectedTreasures((prev) => [...prev, index]);
        setCurrentMessage(treasure);
        setShowMessage(true);
        setScore((prev) => prev + treasure.points);
      }
    });
  };

  const getTreasurePosition = (index: number) => ({
    x: Math.sin(index * (Math.PI / 2)) * 200 + 300,
    y: Math.cos(index * (Math.PI / 2)) * 150 + 200,
  });

  const handleAnswer = (answer: string) => {
    const correct = answer === PUZZLES[currentPuzzle].answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentPuzzle < PUZZLES.length - 1) {
        setCurrentPuzzle((prev) => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  const handleMovement = (direction: string) => {
    const movements = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };

    const movement = movements[direction as keyof typeof movements] || {
      x: 0,
      y: 0,
    };
    const speed = playerSpeed;

    const newPosition = {
      x: Math.max(-5, Math.min(5, currentPosition.x + movement.x * speed)),
      y: Math.max(-3, Math.min(3, currentPosition.y + movement.y * speed)),
    };

    // Check collision with obstacles
    const playerBounds = {
      x: newPosition.x * 60 + 300,
      y: newPosition.y * 60 + 200,
      radius: 20,
    };

    // Collision detection
    const hasCollision = obstacles.some((obstacle) => {
      const distance = Math.sqrt(
        Math.pow(playerBounds.x - obstacle.x, 2) +
          Math.pow(playerBounds.y - obstacle.y, 2)
      );
      return distance < 35; // Slightly smaller collision radius for better precision
    });

    if (hasCollision) {
      if (hasShield) {
        setHasShield(false); // Remove shield if hit
      } else {
        setGameOver(true); // Immediate game over on collision
        return;
      }
    }

    setCurrentPosition(newPosition);

    // Check power-up collection
    powerUps.forEach((powerUp, index) => {
      if (!powerUp.active) return;

      const distance = Math.sqrt(
        Math.pow(playerBounds.x - powerUp.x, 2) +
          Math.pow(playerBounds.y - powerUp.y, 2)
      );

      if (distance < 30) {
        activatePowerUp(powerUp.type, index);
      }
    });
  };

  // Add power-up activation function
  const activatePowerUp = (type: string, index: number) => {
    setPowerUps((prev) =>
      prev.map((p, i) => (i === index ? { ...p, active: false } : p))
    );

    switch (type) {
      case "speed":
        setPlayerSpeed(2);
        setTimeout(() => setPlayerSpeed(1), 5000);
        break;
      case "shield":
        setHasShield(true);
        setTimeout(() => setHasShield(false), 3000);
        break;
      case "time":
        setTimeLeft((prev) => prev + 15);
        break;
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
    <div className="relative w-full h-[80vh] bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg p-8 overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex gap-8">
          <motion.div className="text-white text-xl flex items-center gap-2">
            <Gem className="w-6 h-6 text-yellow-500" />
            <span>Score: {score}</span>
          </motion.div>
          <motion.div className="text-white text-xl">
            Time: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </motion.div>
        </div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      {/* Game Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[600px] h-[400px] border-2 border-white/20 rounded-lg">
          {/* Player Character */}
          <motion.div
            className="absolute"
            animate={{
              x: currentPosition.x * 60 + 300,
              y: currentPosition.y * 60 + 200,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Uncollected Treasures */}
          {TREASURE_ITEMS.map((treasure, index) => {
            if (collectedTreasures.includes(index)) return null;
            const position = getTreasurePosition(index);

            return (
              <motion.div
                key={index}
                className="absolute w-12 h-12 flex items-center justify-center"
                style={{ x: position.x, y: position.y }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {treasure.icon}
              </motion.div>
            );
          })}

          {/* Obstacles */}
          {obstacles.map((obstacle, index) => (
            <motion.div
              key={`obstacle-${index}`}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center
                ${
                  obstacle.pattern === "horizontal"
                    ? "bg-red-500"
                    : obstacle.pattern === "vertical"
                    ? "bg-purple-500"
                    : "bg-orange-500"
                }`}
              style={{
                x: obstacle.x - 20, // Center the obstacle
                y: obstacle.y - 20,
                boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)", // Glow effect
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ))}

          {/* Power-ups */}
          {powerUps.map(
            (powerUp, index) =>
              powerUp.active && (
                <motion.div
                  key={`powerup-${index}`}
                  className={`absolute w-6 h-6 ${
                    powerUp.type === "speed"
                      ? "bg-yellow-400"
                      : powerUp.type === "shield"
                      ? "bg-blue-400"
                      : "bg-green-400"
                  } rounded-full`}
                  style={{ x: powerUp.x, y: powerUp.y }}
                  animate={{ y: ["-5px", "5px"] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2">
          <div />
          <Button onClick={() => handleMovement("up")}>↑</Button>
          <div />
          <Button onClick={() => handleMovement("left")}>←</Button>
          <Button onClick={() => handleMovement("down")}>↓</Button>
          <Button onClick={() => handleMovement("right")}>→</Button>
        </div>

        {/* Lives Display */}
        <div className="absolute top-4 right-24 flex gap-2">
          {[...Array(lives)].map((_, i) => (
            <Heart key={i} className="w-6 h-6 text-red-500" />
          ))}
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessage && currentMessage && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md text-center"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <div className="mb-4">{currentMessage.icon}</div>
              <h3 className="text-2xl font-bold mb-4">Treasure Found!</h3>
              <p className="text-lg mb-6">{currentMessage.message}</p>
              <Button
                onClick={() => {
                  setShowMessage(false);
                  if (collectedTreasures.length >= TREASURE_ITEMS.length) {
                    onComplete(score);
                  }
                }}
              >
                Continue Journey
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-50"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
