"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MemoryGame } from "@/components/games/memory-game";
import { BreathingExercise } from "@/components/games/breathing-exercise";
import { MoodTracker } from "@/components/games/mood-tracker";
import { MindfulnessPuzzle } from "@/components/games/mindfulness-puzzle";
import { GratitudeJournal } from "@/components/games/gratitude-journal";
import { WordChain } from "@/components/games/word-chain";
import { GuidedVisualization } from "@/components/games/guided-visualization";
import {
  Brain,
  Wind,
  SmileIcon,
  Puzzle,
  Heart,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Mental Wellness Games
        </h1>

        <Tabs defaultValue="memory" className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full">
            <TabsTrigger value="memory" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Memory
            </TabsTrigger>
            <TabsTrigger value="breathing" className="flex items-center gap-2">
              <Wind className="w-4 h-4" />
              Breathing
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <SmileIcon className="w-4 h-4" />
              Mood
            </TabsTrigger>
            <TabsTrigger
              value="mindfulness"
              className="flex items-center gap-2"
            >
              <Puzzle className="w-4 h-4" />
              Mindful
            </TabsTrigger>
            <TabsTrigger value="gratitude" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Gratitude
            </TabsTrigger>
            <TabsTrigger value="wordchain" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Words
            </TabsTrigger>
            <TabsTrigger
              value="visualization"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Visualize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="memory">
            <Card className="p-6">
              <MemoryGame />
            </Card>
          </TabsContent>

          <TabsContent value="breathing">
            <BreathingExercise />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="mindfulness">
            <MindfulnessPuzzle />
          </TabsContent>

          <TabsContent value="gratitude">
            <GratitudeJournal />
          </TabsContent>

          <TabsContent value="wordchain">
            <WordChain />
          </TabsContent>

          <TabsContent value="visualization">
            <GuidedVisualization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
