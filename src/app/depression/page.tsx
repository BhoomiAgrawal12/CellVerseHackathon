"use client";
import { useState } from "react";

export default function QuizForm() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [disorder, setDisorder] = useState("PTSD");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify({
        userId: "user-123", // Replace with actual user ID
        disorder,
        answers,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log("Quiz submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-lg font-semibold">Take the {disorder} Quiz</h2>

      <label className="block mt-4">
        <span>Choose Disorder:</span>
        <select value={disorder} onChange={(e) => setDisorder(e.target.value)} className="p-2 border rounded w-full">
          <option>PTSD</option>
          <option>Anxiety</option>
          <option>Depression</option>
          <option>OCD</option>
        </select>
      </label>

      {[1, 2, 3, 4, 5].map((q, idx) => (
        <div key={idx} className="mt-4">
          <span>Question {q} (Rate 1-10):</span>
          <input
            type="number"
            min="1"
            max="10"
            value={answers[idx] || ""}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[idx] = Number(e.target.value);
              setAnswers(newAnswers);
            }}
            className="p-2 border rounded w-full"
          />
        </div>
      ))}

      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
