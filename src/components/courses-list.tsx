import { Category, Course } from "@prisma/client";

type CourseWithProgressWithcategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type CoursesListProps = {
  items: CourseWithProgressWithcategory[];
};

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
