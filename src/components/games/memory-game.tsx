"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MemoryCard } from '@/lib/types';
import { Smile, Brain } from 'lucide-react';

const EMOTIONS = ['😊', '😌', '🥰', '😎', '🤗', '😇', '😄', '🥳'];

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  const initializeGame = () => {
    const shuffledEmotions = [...EMOTIONS, ...EMOTIONS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmotions);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        setMatchedPairs(matchedPairs + 1);
        setCards(cards.map(card =>
          card.id === firstCard || card.id === secondCard
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Emotional Memory
          </h2>
          <p className="text-muted-foreground">Match the emotion pairs to improve focus and memory</p>
        </div>
        <Button onClick={initializeGame}>New Game</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <Card
            key={card.id}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 ${
              card.isMatched || flippedCards.includes(card.id)
                ? 'bg-primary/10'
                : 'hover:bg-secondary'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isMatched || flippedCards.includes(card.id) ? (
              card.emoji
            ) : (
              <Smile className="w-8 h-8 text-muted-foreground" />
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Moves: {moves}</span>
        <span>Pairs Found: {matchedPairs} / {EMOTIONS.length}</span>
      </div>
    </div>
  );
}