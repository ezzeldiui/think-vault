import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = Promise<{ courseId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId } = await params;
}

export async function PATCH(
  request: Request,
  { params }: { params: Params },
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { courseId } = await params;
    const values = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("[COURSE_ID]", error);
    return new NextResponse("An error occurred. Please try again.", {
      status: 500,
    });
  }
}
