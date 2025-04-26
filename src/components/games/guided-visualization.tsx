"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Play, Pause, SkipForward, Volume2 } from "lucide-react";

const SCENES = [
  {
    title: "Peaceful Beach",
    description:
      "Imagine yourself on a peaceful beach. Feel the warm sand beneath your feet and listen to the gentle waves...",
    duration: 30,
    ambience:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b0a6c479.mp3?filename=ocean-waves-112303.mp3",
  },
  {
    title: "Forest Clearing",
    description:
      "You're in a serene forest clearing. Sunlight filters through the leaves, and a gentle breeze rustles the trees...",
    duration: 30,
    ambience:
      "https://cdn.pixabay.com/download/audio/2021/10/04/audio_d1a19121fa.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3",
  },
  {
    title: "Mountain Peak",
    description:
      "Standing atop a majestic mountain peak, you feel strong and capable. The crisp air fills your lungs...",
    duration: 30,
    ambience:
      "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=wind-in-trees-14548.mp3",
  },
];

export function GuidedVisualization() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const newAudio = new Audio(SCENES[currentScene].ambience);
    newAudio.loop = true;
    newAudio.volume = volume / 100;
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, [currentScene, volume]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume, audio]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      audio?.play();
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (SCENES[currentScene].duration * 10);
          if (newProgress >= 100) {
            setIsPlaying(false);
            audio?.pause();
            return 0;
          }
          return newProgress;
        });
      }, 100);
    } else {
      audio?.pause();
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentScene, audio]);

  const handleNext = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentScene((prev) => (prev + 1) % SCENES.length);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Guided Visualization
        </h2>
        <p className="text-muted-foreground">
          Let your mind journey through calming scenes
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            {SCENES[currentScene].title}
          </h3>
          <p className="text-muted-foreground mb-4">
            {SCENES[currentScene].description}
          </p>
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <Slider
                value={[volume]}
                onValueChange={(value: number[]) => setVolume(value[0])}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {SCENES.map((scene, index) => (
            <Button
              key={scene.title}
              variant={currentScene === index ? "default" : "outline"}
              className="h-auto py-4"
              onClick={() => {
                setCurrentScene(index);
                setProgress(0);
                setIsPlaying(false);
              }}
            >
              <div className="text-center">
                <div className="font-medium">{scene.title}</div>
                <div className="text-sm text-muted-foreground">
                  {scene.duration}s
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
