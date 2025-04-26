"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = [
  "🎮",
  "🎲",
  "🎯",
  "🎪",
  "🎨",
  "🎭",
  "🎪",
  "🎯",
  "🎲",
  "🎮",
  "🎨",
  "🎭",
];
const GAME_TIME = 60;

export default function MemoryGridBlitz({ onComplete, onExit }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    initializeGame();
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

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setCanFlip(true);
  };

  const handleCardClick = (cardId: number) => {
    if (
      !canFlip ||
      gameOver ||
      cards[cardId].isMatched ||
      cards[cardId].isFlipped ||
      flippedCards.length === 2
    )
      return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setScore((prev) => prev + 1);
          setCanFlip(true);

          if (matchedCards.every((card) => card.isMatched)) {
            setGameOver(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
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
    <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="text-white text-xl">Matches: {score}</div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              className={`w-24 h-24 rounded-lg text-4xl flex items-center justify-center transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? "bg-blue-500 rotate-0"
                  : "bg-gray-700 hover:bg-gray-600 rotate-180"
              }`}
              onClick={() => handleCardClick(card.id)}
              disabled={!canFlip || card.isMatched || card.isFlipped}
            >
              {(card.isFlipped || card.isMatched) && (
                <span className="transition-all duration-300 transform rotate-0">
                  {card.emoji}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
