"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, LockIcon, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type CourseSidebarItemProps = {
  lable: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

export function CourseSidebarItem({
  id,
  lable,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? LockIcon : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
        isActive &&
          "bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "text-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700",
          )}
        />
        {lable}
      </div>

      <div
        className={cn(
          "ml-auto h-full border-2 border-slate-700 opacity-0 transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700",
        )}
      />
    </button>
  );
}
