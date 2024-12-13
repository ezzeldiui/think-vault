import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { JSX } from "react";

type Params = Promise<{ courseId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId } = await params;
}

export default async function CoursePage({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> {
  const { userId } = await auth();

  const { courseId } = await params;

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields} fields completed`;

  // just ignore this

  return <div>Course Id Page {courseId}</div>;
}
