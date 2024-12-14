import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = Promise<{ courseId: string }>;

export async function POST(
  request: Request,
  { params }: { params: Params },
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { courseId } = await params;
    const { title } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title: title,
        courseId: courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.error("[CHAPTERS]", error);
    return new NextResponse("An error occurred. Please try again.", {
      status: 500,
    });
  }
}
