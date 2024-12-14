"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ActionsProps = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export function Actions({ disabled, courseId, isPublished }: ActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      console.log(isPublished);
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished successfully");
      } else if (!isPublished) {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published successfully");
      }

      router.refresh();
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted successfully");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error: any) {
      toast.error(`Failed to delete the chapter: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading || isPublished}
        onClick={onPublish}
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="outline" size="sm" disabled={isLoading}>
          <Trash2 size={16} />
        </Button>
      </ConfirmModal>
    </div>
  );
}
