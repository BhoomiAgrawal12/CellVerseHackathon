import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure you have prisma setup

export async function POST(req: Request) {
  try {
    const { userId, disorder, answers } = await req.json();

    if (!userId || !disorder || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate score (you can modify this logic)
    const score =
      answers.reduce((acc: number, val: number) => acc + val, 0) /
      answers.length;

    // Categorize severity
    let category = "Mild";
    if (score > 6) category = "Moderate";
    if (score > 8) category = "Severe";

    const quiz = await db.quiz.create({
      data: {
        user: { connect: { id: userId } },
        disorder: disorder,
        score: score,
        category: category,
        questions: {
          create: [
            { text: "Example question 1", answer: "Yes" },
            { text: "Example question 2", answer: "No" },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, quiz });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
