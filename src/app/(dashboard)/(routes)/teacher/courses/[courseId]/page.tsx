import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  CircleDollarSign,
  File,
  Icon,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import { JSX } from "react";
import { TitleForm } from "./_components/title_form";
import { DescriptionForm } from "./_components/description_form";
import { ImageForm } from "./_components/image_form";
import { CategoryForm } from "./_components/category_form";
import { PriceForm } from "./_components/price_form";
import { AttachmentForm } from "./_components/attachment_form";
import { ChaptersForm } from "./_components/chapter_form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

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
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
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
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="Your course is not published, make sure to complete all fields" />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>

            <span className="text-xs text-muted-foreground">
              Complete all fields to publish your course {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={courseId}
            isPublished={course.isPublished}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="truncate text-xl">Customise your course</h2>
            </div>
            <TitleForm initialData={course} courseId={courseId} />
            <DescriptionForm initialData={course} courseId={courseId} />
            <ImageForm initialData={course} courseId={courseId} />
            <CategoryForm
              initialData={course}
              courseId={courseId}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="truncate text-xl">Course Chapters</h2>
              </div>

              <ChaptersForm initialData={course} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="truncate text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="truncate text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
