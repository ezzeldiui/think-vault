import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { title, price } = await request.json();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        price,
      },
    });

    return new NextResponse(JSON.stringify(course), {
      status: 201,
    });
  } catch (error: any) {
    console.error("[COURSES] POST", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
