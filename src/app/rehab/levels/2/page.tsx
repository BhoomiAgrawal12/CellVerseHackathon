"use client";

import Level from "@/components/level/page";
import { levelTwoChallenges } from "@/lib/constants/page";

export default function LevelTwoPage() {
  return (
    <Level
      title="Level 2: Building Resilience"
      challenges={levelTwoChallenges}
    />
  );
}
