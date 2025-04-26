// app/progress/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define the ProgressData interface
interface ProgressData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  skippedTasks: number;
  completionRate: number;
  weeklyProgress: { week: number; completed: number; total: number }[];
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

        const dummyData: ProgressData = {
          totalTasks: 25,
          completedTasks: 15,
          pendingTasks: 7,
          skippedTasks: 3,
          completionRate: 60.0,
          weeklyProgress: [
            { week: 1, completed: 4, total: 5 },
            { week: 2, completed: 3, total: 6 },
            { week: 3, completed: 5, total: 5 },
            { week: 4, completed: 2, total: 7 },
            { week: 5, completed: 1, total: 2 },
          ],
        };

        setProgress(dummyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">No progress data available</p>
      </div>
    );
  }

  // Data for Pie Chart
  const pieData = [
    { name: "Completed", value: progress.completedTasks, color: "#4CAF50" },
    { name: "Pending", value: progress.pendingTasks, color: "#FF9800" },
    { name: "Skipped", value: progress.skippedTasks, color: "#F44336" },
  ];

  // Data for Bar Chart (weekly progress)
  const barData = progress.weeklyProgress.map((week) => ({
    week: `Week ${week.week}`,
    Completed: week.completed,
    Remaining: week.total - week.completed,
  }));

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Task Progress Dashboard
        </h1>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Tasks" value={progress.totalTasks} />
          <StatCard label="Completed" value={progress.completedTasks} />
          <StatCard label="Pending" value={progress.pendingTasks} />
          <StatCard label="Skipped" value={progress.skippedTasks} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart: Task Distribution */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Task Status Distribution
            </h2>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Bar Chart: Weekly Progress */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Weekly Progress
            </h2>
            <BarChart
              width={400}
              height={300}
              data={barData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Completed" fill="#4CAF50" />
              <Bar dataKey="Remaining" fill="#FF9800" />
            </BarChart>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Overall Completion Rate
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ width: `${progress.completionRate}%` }}
            >
              {progress.completionRate}%
            </div>
          </div>
        </div>

        {/* Weekly Progress Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Weekly Progress Details
          </h2>
          <div className="space-y-4">
            {progress.weeklyProgress.map((week) => (
              <div
                key={week.week}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  Week {week.week}
                </h3>
                <p className="text-gray-600">
                  Completed: {week.completed} / {week.total}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(week.completed / week.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}
