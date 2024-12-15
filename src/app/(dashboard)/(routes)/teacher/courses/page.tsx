import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data.table";
import { columns } from "./_components/columns";
import { Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function CoursesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
