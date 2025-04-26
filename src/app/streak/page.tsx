"use client";

import React, { useEffect, useState } from "react";
import { Flame, Trophy, Target } from "lucide-react";

interface ProgressData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  skippedTasks: number;
  completionRate: number;
  weeklyProgress: { week: number; completed: number; total: number }[];
}

function App() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch("/api/tasks/progress");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ProgressData = await response.json();
        setProgressData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchProgressData();
  }, []);

  if (!progressData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-100 rounded-2xl p-8 shadow-xl border border-gray-300">
          <h1 className="text-4xl font-bold text-black mb-2">My Progress</h1>
          <p className="text-gray-600">Track your tasks and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-300">
            <div className="flex items-center space-x-4">
              <Flame className="w-12 h-12 text-gray-600" />
              <div>
                <p className="text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-black">
                  {progressData.totalTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-300">
            <div className="flex items-center space-x-4">
              <Trophy className="w-12 h-12 text-gray-600" />
              <div>
                <p className="text-gray-600">Completed Tasks</p>
                <p className="text-3xl font-bold text-black">
                  {progressData.completedTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-300">
            <div className="flex items-center space-x-4">
              <Target className="w-12 h-12 text-gray-600" />
              <div>
                <p className="text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-black">
                  {progressData.completionRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Section */}
        <div className="bg-gray-100 rounded-2xl p-8 shadow-xl border border-gray-300">
          <h2 className="text-2xl font-bold text-black mb-4">
            Weekly Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {progressData.weeklyProgress &&
            progressData.weeklyProgress.length > 0 ? (
              progressData.weeklyProgress.map((week) => (
                <div
                  key={week.week}
                  className="bg-gray-200 rounded-xl p-6 shadow-md border border-gray-300"
                >
                  <p className="text-gray-600">Week {week.week}</p>
                  <p className="text-2xl font-bold text-black">
                    {week.completed} / {week.total} tasks completed
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No weekly progress data available.
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
