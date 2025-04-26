"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GameProgress {
  id: string;
  userId: string;
  gameId: string;
  datePlayed: string;
  score: number;
  completion: boolean;
  timeSpent?: number | null;
  accuracy?: number | null;
  difficulty: string;
  streak?: number | null;
  dropOffRate: number;
  frustrationScore?: number | null;
  badgesEarned: string[];
  challengesDone?: number | null;
  gameData?: any;
}

interface DashboardProps {
  initialData: GameProgress[];
}

export default function Dashboard({ initialData }: DashboardProps) {
  const [gameData, setGameData] = useState<GameProgress[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(initialData?.length === 0);
  const [timeRange, setTimeRange] = useState<string>("week");
  const [selectedMetric, setSelectedMetric] = useState<string>("score");

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch("/api/games/progress", {
            method: "GET",
          });
          const data: GameProgress[] = await response.json();
          if (Array.isArray(data)) {
            setGameData(data);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        } catch (error) {
          console.error("Error fetching game progress:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [initialData]);

  // Calculate metrics
  const calculateAverages = () => {
    if (!gameData.length)
      return { avgScore: 0, avgAccuracy: 0, avgTimeSpent: 0 };

    const avgScore =
      gameData.reduce((sum, game) => sum + game.score, 0) / gameData.length;
    const gamesWithAccuracy = gameData.filter(
      (game) => game.accuracy !== null && game.accuracy !== undefined
    );
    const avgAccuracy = gamesWithAccuracy.length
      ? gamesWithAccuracy.reduce((sum, game) => sum + (game.accuracy || 0), 0) /
        gamesWithAccuracy.length
      : 0;

    const gamesWithTime = gameData.filter(
      (game) => game.timeSpent !== null && game.timeSpent !== undefined
    );
    const avgTimeSpent = gamesWithTime.length
      ? gamesWithTime.reduce((sum, game) => sum + (game.timeSpent || 0), 0) /
        gamesWithTime.length
      : 0;

    return { avgScore, avgAccuracy, avgTimeSpent };
  };

  const { avgScore, avgAccuracy, avgTimeSpent } = calculateAverages();

  const completionRate = gameData.length
    ? (gameData.filter((game) => game.completion).length / gameData.length) *
      100
    : 0;

  const maxStreak = gameData.length
    ? Math.max(...gameData.map((game) => game.streak || 0))
    : 0;

  const totalBadges = gameData.length
    ? [...new Set(gameData.flatMap((game) => game.badgesEarned))].length
    : 0;

  const filterDataByTimeRange = (data: GameProgress[]) => {
    const now = new Date();
    const cutoffDate = new Date();

    switch (timeRange) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        cutoffDate.setFullYear(now.getFullYear() - 1);
    }

    return data.filter((game) => new Date(game.datePlayed) >= cutoffDate);
  };

  const filteredData = filterDataByTimeRange(gameData);

  // Chart Data Configurations
  const progressChartData = {
    labels: filteredData.map((game) => {
      const date = new Date(game.datePlayed);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label:
          selectedMetric === "score"
            ? "Score"
            : selectedMetric === "accuracy"
            ? "Accuracy (%)"
            : "Time Spent (min)",
        data: filteredData.map((game) =>
          selectedMetric === "score"
            ? game.score
            : selectedMetric === "accuracy"
            ? (game.accuracy || 0) * 100
            : (game.timeSpent || 0) / 60
        ),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const difficultyDistributionData = {
    labels: ["Easy", "Medium", "Hard", "Adaptive"],
    datasets: [
      {
        label: "Games Played",
        data: [
          gameData.filter((game) => game.difficulty === "Easy").length,
          gameData.filter((game) => game.difficulty === "Medium").length,
          gameData.filter((game) => game.difficulty === "Hard").length,
          gameData.filter((game) => game.difficulty === "Adaptive").length,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(244, 63, 94, 0.7)",
          "rgba(168, 85, 247, 0.7)",
        ],
        borderColor: ["#16A34A", "#2563EB", "#E11D48", "#9333EA"],
        borderWidth: 1,
      },
    ],
  };

  const playerEngagementData = {
    labels: [
      "Completion Rate",
      "Drop-off Rate",
      "Frustration Level",
      "Achievement Rate",
    ],
    datasets: [
      {
        label: "Engagement Metrics",
        data: [
          completionRate / 100,
          gameData.reduce((sum, game) => sum + game.dropOffRate, 0) /
            (gameData.length || 1),
          gameData.reduce(
            (sum, game) => sum + (game.frustrationScore || 0),
            0
          ) /
            (gameData.length || 1) /
            10,
          gameData.reduce((sum, game) => sum + (game.challengesDone || 0), 0) /
            (gameData.reduce(
              (sum, game) => sum + (game.challengesDone || 0),
              0
            ) +
              gameData.length) || 0,
        ],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(99, 102, 241, 1)",
      },
    ],
  };

  const badgesChartData = {
    labels: [...new Set(gameData.flatMap((game) => game.badgesEarned))].slice(
      0,
      8
    ),
    datasets: [
      {
        label: "Players Earned",
        data: [...new Set(gameData.flatMap((game) => game.badgesEarned))]
          .slice(0, 8)
          .map(
            (badge) =>
              gameData.filter((game) => game.badgesEarned.includes(badge))
                .length
          ),
        backgroundColor: "rgba(251, 146, 60, 0.7)",
        borderColor: "#F97316",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#1F2937" } },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#6B7280" },
        grid: { color: "rgba(209, 213, 219, 0.2)" },
        beginAtZero: true,
      },
      x: { ticks: { color: "#6B7280" }, grid: { display: false } },
    },
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(209, 213, 219, 0.3)",
        },
        suggestedMin: 0,
        suggestedMax: 1,
        ticks: {
          stepSize: 0.2,
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.r !== null) {
              label += (context.parsed.r * 100).toFixed(1) + "%";
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center tracking-tight">
            Game Progress Dashboard
          </h1>
          <p className="text-gray-600 text-center">
            Track your gaming performance and achievements over time
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading game data...</p>
          </div>
        ) : (
          <>
            {/* Filters and Controls */}
            <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-700">
                  Time Range
                </h3>
                <div className="flex space-x-2">
                  {["week", "month", "quarter", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        timeRange === range
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-700">Metric</h3>
                <div className="flex space-x-2">
                  {[
                    { id: "score", label: "Score" },
                    { id: "accuracy", label: "Accuracy" },
                    { id: "timeSpent", label: "Time" },
                  ].map((metric) => (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        selectedMetric === metric.id
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {metric.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <span className="text-xs font-medium text-indigo-600 uppercase">
                  Current Score
                </span>
                <div className="mt-2 flex justify-between items-end">
                  <p className="text-3xl font-bold text-gray-800">
                    {gameData.length ? gameData[0].score.toLocaleString() : "0"}
                  </p>
                  <span className="text-sm text-gray-500">
                    avg: {avgScore.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md">
                <span className="text-xs font-medium text-emerald-600 uppercase">
                  Streak
                </span>
                <div className="mt-2 flex justify-between items-end">
                  <p className="text-3xl font-bold text-gray-800">
                    {gameData.length ? gameData[0].streak || 0 : "0"}
                  </p>
                  <span className="text-sm text-gray-500">
                    best: {maxStreak}
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md">
                <span className="text-xs font-medium text-amber-600 uppercase">
                  Completion Rate
                </span>
                <div className="mt-2 flex justify-between items-end">
                  <p className="text-3xl font-bold text-gray-800">
                    {completionRate.toFixed(1)}%
                  </p>
                  <span className="text-sm text-gray-500">
                    {gameData.filter((game) => game.completion).length} games
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md">
                <span className="text-xs font-medium text-rose-600 uppercase">
                  Badges Earned
                </span>
                <div className="mt-2 flex justify-between items-end">
                  <p className="text-3xl font-bold text-gray-800">
                    {totalBadges}
                  </p>
                  <span className="text-sm text-gray-500">total unique</span>
                </div>
              </div>
            </div>

            {/* Charts and Detailed Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Progress Over Time */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {selectedMetric === "score"
                    ? "Score Progress"
                    : selectedMetric === "accuracy"
                    ? "Accuracy Trend"
                    : "Time Spent Tracking"}
                </h2>
                {filteredData.length > 0 ? (
                  <Line data={progressChartData} options={chartOptions} />
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 italic">
                      No data available for selected period
                    </p>
                  </div>
                )}
              </div>

              {/* Difficulty Distribution */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Difficulty Distribution
                </h2>
                {gameData.length > 0 ? (
                  <Bar
                    data={difficultyDistributionData}
                    options={chartOptions}
                  />
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 italic">No data available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Player Engagement Radar */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Player Engagement Metrics
                </h2>
                {gameData.length > 0 ? (
                  <Radar data={playerEngagementData} options={radarOptions} />
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 italic">No data available</p>
                  </div>
                )}
              </div>

              {/* Top Badges */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Most Earned Badges
                </h2>
                {gameData.length > 0 &&
                [...new Set(gameData.flatMap((game) => game.badgesEarned))]
                  .length > 0 ? (
                  <Bar data={badgesChartData} options={chartOptions} />
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 italic">No badges earned yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Game Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Game
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {gameData.slice(0, gameData.length).map((game) => (
                      <tr key={game.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(game.datePlayed).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {game.gameId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.score.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.accuracy
                            ? `${(game.accuracy * 100).toFixed(1)}%`
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.timeSpent
                            ? `${Math.floor(game.timeSpent / 60)}m ${
                                game.timeSpent % 60
                              }s`
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              game.difficulty === "Easy"
                                ? "bg-green-100 text-green-800"
                                : game.difficulty === "Medium"
                                ? "bg-blue-100 text-blue-800"
                                : game.difficulty === "Hard"
                                ? "bg-red-100 text-red-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {game.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              game.completion
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {game.completion ? "Completed" : "Incomplete"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {gameData.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500 italic">
                      No recent game activity
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
