"use client";

import { Category, Course } from "@prisma/client";
import { Button } from "./ui/button";
import { RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { CourseCard } from "./course-card";

type CourseWithProgressWithcategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type CoursesListProps = {
  items: CourseWithProgressWithcategory[];
};

export const CoursesList = ({ items }: CoursesListProps) => {
  const router = useRouter();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Button onClick={() => window.location.reload()}>
          <span className="flex items-center space-x-2">
            <RefreshCw className="size-4" />
            <span>Refresh</span>
          </span>
        </Button>
      </div>
      <div>
        {items.length === 0 ? (
          <>
            <div className="mt-10 text-center text-sm text-muted-foreground">
              No courses found
            </div>
          </>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {items.map((item) => (
              <CourseCard
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  imageUrl: item.imageUrl!,
                  chaptersLength: item.chapters.length,
                  price: item.price!,
                  progress: item.progress,
                  category: item.category?.name!,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
