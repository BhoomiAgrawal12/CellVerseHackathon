"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Router } from "next/router";
import Link from "next/link";

interface DailyTask {
  id: string;
  userId: string;
  disorder: string;
  severity: string;
  week: number;
  day: number;
  task: string;
  status: "pending" | "completed" | "skipped" | string;
  reflection?: string;
  createdAt: string;
}
interface Video {
  id: string;
  userId: string;
  disorder: string;
  severity: string;
  week: number;
  day: number;
  activity: string;
  status: "pending" | "completed" | "skipped" | string;
  reflection?: string;
  createdAt: string;
}
const TaskManager = () => {
  const [tasks, setTasks] = useState<
    Record<number, Record<number, DailyTask[]>>
  >({});
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Tasks:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    fetch("/api/youtube-activities/assign")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Videos:", data);
        setVideos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  const weekTasks = tasks[selectedWeek] || {};
  const dayTasks = weekTasks[selectedDay] || [];

  const handleTakeActivity = async (taskId: string) => {
    await fetch(`/api/tasks/assign`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, status: "completed" }),
    });

    setTasks((prev) => ({
      ...prev,
      [selectedWeek]: {
        ...prev[selectedWeek],
        [selectedDay]: prev[selectedWeek][selectedDay].map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        ),
      },
    }));
  };

  const handleVideo = async (query: any) => {
    const response = await fetch(`/api/youtube?query=${query}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("API Response:", data);
    if (!response.ok) {
      console.error("Failed to fetch video:", response.status);
      return;
    }
    if (data.error) {
      console.error("Error fetching video:", data.error);
      return;
    }
    const { id } = data;
    if (!id) {
      console.error("No video ID found in response");
      return;
    }
    window.location.href = `/video?query=${id}`;
  };
  const handleTakeActivity2 = async (taskId: string) => {
    await fetch(`/api/youtube-activities/assign`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, status: "completed" }),
    });

    // setVideos((prev) => ({
    //   ...prev,
    //   [selectedWeek]: {
    //     ...prev[selectedWeek],
    //     [selectedDay]: prev[selectedWeek][selectedDay].map((task: any) =>
    //       task.id === taskId ? { ...task, status: "completed" } : task
    //     ),
    //   },
    // }));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Task Manager - Weekly Challenge
      </h1>

      {/* Week Selection */}
      <div className="flex justify-center gap-4 mb-4">
        {[1, 2, 3, 4, 5].map((week) => (
          <Button
            key={week}
            onClick={() => setSelectedWeek(week)}
            className={`px-4 py-2 ${
              selectedWeek === week ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Week {week}
          </Button>
        ))}
      </div>

      {/* Day Selection */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <Button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 ${
              selectedDay === day ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            Day {day}
          </Button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dayTasks.length > 0 ? (
          dayTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border rounded-xl shadow-lg bg-blue-100 border-blue-300 min-h-[250px]"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {task.task}
              </h2>
              <p className="text-gray-700 mb-4">
                Disorder: {task.disorder} ({task.severity})
              </p>
              <p className="text-gray-700 mb-4">
                {task.reflection
                  ? `Reflection: ${task.reflection}`
                  : "No reflections yet"}
              </p>

              <span
                className={`text-xl font-bold ${
                  task.status === "completed"
                    ? "text-green-700"
                    : task.status === "skipped"
                    ? "text-red-700"
                    : "text-blue-700"
                }`}
              >
                {task.status === "completed"
                  ? "Completed"
                  : task.status === "skipped"
                  ? "Skipped"
                  : "Pending"}
              </span>

              <div className="flex items-center mt-4 justify-start gap-2">
                <Button
                  onClick={() => handleTakeActivity(task.id)}
                  disabled={task.status !== "pending"}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                >
                  Take Activity
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks for this day.</p>
        )}
        {videos.length > 0 ? (
          videos.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border rounded-xl shadow-lg bg-blue-100 border-blue-300 min-h-[250px]"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {task.activity}
              </h2>
              <p className="text-gray-700 mb-4">
                Disorder: {task.disorder} ({task.severity})
              </p>
              <p className="text-gray-700 mb-4">
                {task.reflection
                  ? `Reflection: ${task.reflection}`
                  : "No reflections yet"}
              </p>

              <span
                className={`text-xl font-bold ${
                  task.status === "completed"
                    ? "text-green-700"
                    : task.status === "skipped"
                    ? "text-red-700"
                    : "text-blue-700"
                }`}
              >
                {task.status === "completed"
                  ? "Completed"
                  : task.status === "skipped"
                  ? "Skipped"
                  : "Pending"}
              </span>

              <div className="flex items-center mt-4 justify-start gap-2">
                {/* <Link
                  href="/youtube"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                >
                  {" "}
                  Take Activity
                </Link> */}
                <Button
                  onClick={() => handleVideo(task.activity)}
                  disabled={task.status !== "pending"}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                >
                  Take Activity
                </Button>

                <Button
                  onClick={() => handleTakeActivity2(task.id)}
                  disabled={task.status !== "pending"}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                >
                  Complete
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
