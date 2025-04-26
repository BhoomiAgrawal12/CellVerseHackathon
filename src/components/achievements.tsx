"use client";

import { Achievement } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Award, Lock } from "lucide-react";

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={`p-4 ${achievement.unlocked ? "bg-card" : "bg-muted"}`}
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full bg-primary/10">
              {achievement.unlocked ? (
                <Award className="w-6 h-6 text-primary" />
              ) : (
                <Lock className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
              <p className="text-sm font-medium mt-2">
                {achievement.points} points
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
