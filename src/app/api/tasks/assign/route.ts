import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import tasksDataImport from "@/lib/data/tasks.json";
import { auth } from "../../../../../auth";

interface Activity {
  physical_activities: string[];
  thoughtful_tasks: string[];
}

interface Day {
  day: number;
  activities_by_severity: {
    mild: Activity;
    moderate: Activity;
    severe: Activity;
  };
}

interface Week {
  week: number;
  theme: string;
  days: Day[];
}

interface DisorderTasks {
  tasks: {
    weeks: Week[];
    notes: Record<string, unknown>;
  };
  youtube_keywords?: string[];
}

interface TasksData {
  Depression: DisorderTasks;
  [key: string]: DisorderTasks;
}

// Type the imported data
const tasksData = tasksDataImport as TasksData;

// Helper function to combine physical and thoughtful tasks into a single string
const combineTasks = (
  physicalTasks: string[],
  thoughtfulTasks: string[]
): string[] => {
  // const physical =
  //   physicalTasks.length > 0 ? `Physical: ${physicalTasks.join(", ")}` : "";
  // const thoughtful =
  //   thoughtfulTasks.length > 0
  //     ? `Thoughtful: ${thoughtfulTasks.join(", ")}`
  //     : "";
  return [...physicalTasks, ...thoughtfulTasks];
};

// POST: Assign tasks to a user
export async function POST(req: NextRequest) {
  try {
    const { disease, severity } = await req.json();
    const disorder = disease as string;
    const session = await auth();
    const userId = await session?.user.id;
    // console.log(req);
    // console.log(disorder);
    // console.log(severity);

    if (!userId || !disorder || !severity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // if (disorder !== "Depression") {
    //   return NextResponse.json(
    //     { error: "Unsupported disorder type" },
    //     { status: 400 }
    //   );
    // }

    if (!["mild", "moderate", "severe"].includes(severity)) {
      return NextResponse.json(
        { error: "Invalid severity level" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the disorder exists in the tasksData
    if (!tasksData[disorder]) {
      return NextResponse.json(
        { error: "Unsupported disorder type" },
        { status: 400 }
      );
    }

    const data = tasksData[disorder];
    // Extract tasks from JSON
    const weeks = data.tasks.weeks;
    const tasks: {
      userId: string;
      disorder: string;
      severity: string;
      week: number;
      day: number;
      task: string;
      status: "pending";
      reflection: null;
    }[] = [];

    for (let weekIdx = 0; weekIdx < weeks.length; weekIdx++) {
      const week = weeks[weekIdx];
      const weekNumber = week.week;

      for (let dayIdx = 0; dayIdx < week.days.length; dayIdx++) {
        const day = week.days[dayIdx];
        const dayNumber = day.day; // 1-7 as per schema
        const activities =
          day.activities_by_severity[
            severity as "mild" | "moderate" | "severe"
          ];

        const combinedTasks = combineTasks(
          activities.physical_activities,
          activities.thoughtful_tasks
        );
        for (let taskIdx = 0; taskIdx < combinedTasks.length; taskIdx++) {
          tasks.push({
            userId,
            disorder,
            severity,
            week: weekNumber,
            day: dayNumber,
            task: combinedTasks[taskIdx],
            status: "pending" as const,
            reflection: null,
          });
        }
      }
    }

    // Bulk create tasks with transaction to avoid duplicates
    await db.$transaction(async (prisma) => {
      await prisma.dailyTask.deleteMany({
        where: { userId, disorder },
      });

      await prisma.dailyTask.createMany({
        data: tasks,
      });
    });

    return NextResponse.json(
      { message: "Tasks assigned successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error assigning tasks:", error);
    return NextResponse.json(
      { error: "Failed to assign tasks:" },
      { status: 500 }
    );
  }
}

// PATCH: Update task status
export async function PATCH(req: NextRequest) {
  try {
    const { taskId, status } = await req.json();
    const session = await auth();
    const userId = await session?.user.id;

    // Validation
    if (!userId || !taskId || !status) {
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

    // if (week < 1 || week > 5 || day < 1 || day > 7) {
    //   return NextResponse.json(
    //     { error: "Invalid week or day range" },
    //     { status: 400 }
    //   );
    // }

    // Update tasks
    const updated = await db.dailyTask.update({
      where: { id: taskId },
      data: {
        status,
      },
    });

    // if (updated.count === 0) {
    //   return NextResponse.json(
    //     { error: "No tasks found to update" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({ message: "Task updated successfully!" });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
