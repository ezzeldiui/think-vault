"use client";

import { Button } from "@/components/ui/button";

type CourseEnrollButtonProps = {
  price: number;
  courseId: string;
};

export function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps) {
  return (
    <Button size="sm" className="w-full md:w-auto">
      Enroll for {price} USD
    </Button>
  );
}
