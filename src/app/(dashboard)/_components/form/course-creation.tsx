import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function CourseCreation({
  resolvedParams,
}: {
  resolvedParams: { courseId: string };
}) {
  const course = await db.course.findUnique({
    where: {
      id: resolvedParams.courseId,
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
}
