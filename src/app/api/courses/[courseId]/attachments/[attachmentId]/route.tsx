import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = Promise<{ courseId: string; attachmentId: string }>;

export async function DELETE(
  request: Request,
  { params }: { params: Params },
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { courseId, attachmentId } = await params;

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

    const attachment = await db.attachment.delete({
      where: {
        courseId: courseId,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment, { status: 200 });
  } catch (error) {
    console.error("[COURSE_ID]", error);
    return new NextResponse("An error occurred. Please try again.", {
      status: 500,
    });
  }
}
