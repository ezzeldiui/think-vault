import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type SearchPageProps = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const sParams = await searchParams;

  const course = await getCourses({
    userId,
    ...sParams,
  });

  const handleClick = () => {
    console.log("Refresh clicked");
  };

  return (
    <>
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={category} />
        <div className="mt-6 flex w-full flex-col justify-between">
          <CoursesList items={course} />
        </div>
      </div>
    </>
  );
}

// add a dumbby dat
