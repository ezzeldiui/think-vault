import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}): Promise<JSX.Element> {
  const { userId } = await auth();

  const id = (await params).courseId;

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: id,
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

  return <div>Course Id Page {id}</div>;
}
