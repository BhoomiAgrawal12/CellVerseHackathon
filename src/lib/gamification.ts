import { Achievement } from "./types";

export const calculateLevel = (points: number): number => {
  return Math.floor(Math.sqrt(points / 100)) + 1;
};

export const calculatePointsForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_login",
    name: "Welcome Aboard",
    description: "Log in for the first time",
    points: 50,
    icon: "award",
    unlocked: false,
  },
  {
    id: "profile_complete",
    name: "Identity Established",
    description: "Complete your profile information",
    points: 100,
    icon: "user-check",
    unlocked: false,
  },
  {
    id: "first_contribution",
    name: "First Steps",
    description: "Make your first contribution",
    points: 150,
    icon: "star",
    unlocked: false,
  },
  {
    id: "streak_week",
    name: "Consistency is Key",
    description: "Maintain a 7-day activity streak",
    points: 300,
    icon: "flame",
    unlocked: false,
  },
];
