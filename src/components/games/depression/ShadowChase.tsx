"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Star } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Entity {
  x: number;
  y: number;
  speed: number;
  size: number;
}

const GAME_TIME = 45;
const PLAYER_SPEED = 6;
const SHADOW_BASE_SPEED = 2;
const STAR_COUNT = 5;
const POWER_DURATION = 5000;

export default function ShadowChase({ onComplete, onExit }: Props) {
  const [player, setPlayer] = useState<Entity>({
    x: 400,
    y: 300,
    speed: PLAYER_SPEED,
    size: 20,
  });
  const [shadows, setShadows] = useState<Entity[]>([]);
  const [stars, setStars] = useState<Entity[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [powerTimeLeft, setPowerTimeLeft] = useState(0);

  const spawnShadow = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 400;
    return {
      x: player.x + Math.cos(angle) * distance,
      y: player.y + Math.sin(angle) * distance,
      speed: SHADOW_BASE_SPEED + Math.random() * 2,
      size: 25,
    };
  }, [player.x, player.y]);

  const spawnStar = useCallback(
    () => ({
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: Math.random() * (window.innerHeight - 100) + 50,
      speed: 0,
      size: 15,
    }),
    []
  );

  useEffect(() => {
    setStars(
      Array(STAR_COUNT)
        .fill(null)
        .map(() => spawnStar())
    );
    setShadows([spawnShadow()]);

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = (e.target as HTMLElement).getBoundingClientRect();
      setPlayer((prev) => ({
        ...prev,
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      }));
    };

    const gameLoop = setInterval(() => {
      if (gameOver) return;

      // Update shadows
      setShadows((prev) => {
        const newShadows = prev.map((shadow) => {
          const angle = Math.atan2(player.y - shadow.y, player.x - shadow.x);
          return {
            ...shadow,
            x: shadow.x + Math.cos(angle) * shadow.speed,
            y: shadow.y + Math.sin(angle) * shadow.speed,
          };
        });

        // Add new shadow periodically
        if (Math.random() < 0.005 && newShadows.length < 5) {
          newShadows.push(spawnShadow());
        }

        return newShadows;
      });

      // Check star collisions
      setStars((prev) =>
        prev.filter((star) => {
          const dx = player.x - star.x;
          const dy = player.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < player.size + star.size) {
            setScore((s) => s + 1);
            setIsPowered(true);
            setPowerTimeLeft(POWER_DURATION);
            return false;
          }
          return true;
        })
      );

      // Spawn new stars
      setStars((prev) => {
        if (prev.length < STAR_COUNT && Math.random() < 0.1) {
          return [...prev, spawnStar()];
        }
        return prev;
      });

      // Check shadow collisions
      if (!isPowered) {
        shadows.forEach((shadow) => {
          const dx = player.x - shadow.x;
          const dy = player.y - shadow.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < player.size + shadow.size) {
            setGameOver(true);
          }
        });
      }
    }, 1000 / 60);

    const powerTimer = setInterval(() => {
      if (isPowered) {
        setPowerTimeLeft((prev) => {
          if (prev <= 100) {
            setIsPowered(false);
            return 0;
          }
          return prev - 100;
        });
      }
    }, 100);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(gameLoop);
      clearInterval(timer);
      clearInterval(powerTimer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gameOver, player.size, spawnShadow, spawnStar, isPowered]);

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
    <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="text-white text-xl">Stars: {score}</div>
        <div className="text-white text-xl">
          {isPowered && (
            <span className="text-yellow-400">
              Powered! {Math.ceil(powerTimeLeft / 1000)}s
            </span>
          )}
        </div>
        <div className="text-white text-xl">Time: {timeLeft}s</div>
        <Button variant="outline" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div
        className={`absolute transition-all duration-100 ${
          isPowered ? "bg-yellow-400" : "bg-blue-400"
        } rounded-full`}
        style={{
          left: player.x - player.size,
          top: player.y - player.size,
          width: player.size * 2,
          height: player.size * 2,
        }}
      />

      {shadows.map((shadow, index) => (
        <div
          key={index}
          className="absolute bg-purple-900 rounded-full transition-all duration-100"
          style={{
            left: shadow.x - shadow.size,
            top: shadow.y - shadow.size,
            width: shadow.size * 2,
            height: shadow.size * 2,
            opacity: isPowered ? 0.5 : 0.8,
          }}
        >
          <Moon className="w-full h-full text-purple-700" />
        </div>
      ))}

      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute transition-all duration-100"
          style={{
            left: star.x - star.size,
            top: star.y - star.size,
            width: star.size * 2,
            height: star.size * 2,
          }}
        >
          <Star className="w-full h-full text-yellow-400 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
