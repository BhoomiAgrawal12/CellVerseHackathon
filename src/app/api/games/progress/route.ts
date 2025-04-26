import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "../../../../../auth";

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const {
      gameId,
      score,
      completion,
      timeSpent,
      difficulty,
      streak,
      frustrationScore,
    } = await req.json();

    console.log("GAME NAME " + gameId);

    // Validate required fields
    if (!userId || !gameId || !score || !completion || !timeSpent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const progress = await db.gameProgress.create({
      data: {
        userId,
        gameId,
        score,
        completion,
        timeSpent,
        difficulty,
        streak,
        frustrationScore,
      },
    });

    return NextResponse.json(
      { message: "Progress saved!", progress },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user.id;
  try {
    // const gameType = searchParams.get("gameType"); // Optional filter

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const progress = await db.gameProgress.findMany({
      where: { userId: userId },
      orderBy: { datePlayed: "desc" },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to retrieve progress" },
      { status: 500 }
    );
  }
}
