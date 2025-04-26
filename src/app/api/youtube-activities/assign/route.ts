import data from "@/lib/data/tasks.json";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { YoutubeActivity } from "@prisma/client";
import { auth } from "../../../../../auth";

// Type definition for tasks.json structure
interface TasksData {
  [disorder: string]: {
    youtube_keywords: string[];
  };
}

// Helper function to get a random keyword from an array
const getRandomKeyword = (keywords: string[]): string => {
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
};

// POST: Assign random YouTube keywords for 7 days to a user
export async function POST(req: NextRequest) {
  try {
    const { disease, severity } = await req.json();
    const session = await auth();
    const disorder = disease;

    const userId = await session?.user.id;
    // Validation
    if (!userId || !disorder) {
      return NextResponse.json(
        { error: "Missing userId or disorder" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if disorder exists in tasks.json
    const tasks = data as unknown as TasksData;
    if (!tasks[disorder] || !tasks[disorder].youtube_keywords) {
      return NextResponse.json(
        { error: "Unsupported disorder or no YouTube keywords found" },
        { status: 400 }
      );
    }
    tasks[disorder].youtube_keywords.map((keyword: string) => ({}));
    const keywords = tasks[disorder].youtube_keywords;
    console.log(keywords);
    console.log(tasks);
    // Generate activities for 7 days
    const activities: any[] = [];
    for (let week = 1; week <= 5; week++) {
      for (let day = 1; day <= 7; day++) {
        activities.push({
          userId,
          day,
          activity: getRandomKeyword(keywords), // Random keyword from disorder's list
          status: "pending" as const,
          reflection: null,
          severity: severity,
          week,
          disorder: disorder,
        });
      }
    }

    // Bulk create activities with transaction to replace existing ones
    await db.$transaction(async (prisma) => {
      await prisma.youtubeActivity.deleteMany({
        where: { userId, disorder },
      });

      await prisma.youtubeActivity.createMany({
        data: activities,
      });
    });

    return NextResponse.json(
      { message: "YouTube activities assigned successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error assigning YouTube activities:", error);
    return NextResponse.json(
      { error: "Failed to assign YouTube activities" },
      { status: 500 }
    );
  }
}

// PATCH: Update YouTube activity status
export async function PATCH(req: NextRequest) {
  try {
    const { status, videoId } = await req.json();
    const session = await auth();
    const userId = await session?.user.id;
    // Validation
    if (!userId || !videoId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["pending", "completed", "skipped"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // if (day < 1 || day > 7) {
    //   return NextResponse.json({ error: 'Invalid day range' }, { status: 400 });
    // }

    // Update activity
    const updated = await db.youtubeActivity.update({
      where: { id: videoId },
      data: {
        status,
      },
    });

    // if (updated.count === 0) {
    //   return NextResponse.json({ error: 'No activity found to update' }, { status: 404 });
    // }

    return NextResponse.json({
      message: "YouTube activity updated successfully!",
    });
  } catch (error) {
    console.error("Error updating YouTube activity:", error);
    return NextResponse.json(
      { error: "Failed to update YouTube activity" },
      { status: 500 }
    );
  }
}

// GET: Fetch YouTube activities for a user
export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = await session?.user.id;
  try {
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    // Fetch all YouTube activities for the user
    const activities = await db.youtubeActivity.findMany({
      where: { userId },
      orderBy: { day: "asc" },
    });

    if (activities.length === 0) {
      return NextResponse.json(
        { message: "No YouTube activities found for this user" },
        { status: 404 }
      );
    }
    console.log("Activities" + activities);

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error retrieving YouTube activities:", error);
    return NextResponse.json(
      { error: "Failed to retrieve YouTube activities" },
      { status: 500 }
    );
  }
}
