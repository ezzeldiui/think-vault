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

    const { url } = await request.json();

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment, { status: 200 });
  } catch (error) {
    console.error("[COURSE_ID] Attachments", error);
    return new NextResponse("An error occurred. Please try again.", {
      status: 500,
    });
  }
}
