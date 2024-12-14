"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ChapterActionProps = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

export function ChapterAction({
  disabled,
  chapterId,
  courseId,
  isPublished,
}: ChapterActionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`,
        );
        toast.success("Chapter unpublished successfully");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`,
        );

        toast.success("Chapter published successfully");
      }

      router.refresh();
    } catch (error: any) {
      toast.error(`Failed to publish the chapter: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted successfully");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error: any) {
      toast.error(`Failed to delete the chapter: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled || isLoading} onClick={onPublish} size="sm">
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
