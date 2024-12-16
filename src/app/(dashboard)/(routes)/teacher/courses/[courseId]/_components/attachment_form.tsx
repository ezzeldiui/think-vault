"use client";

import axios from "axios";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import { attachmentFormSchema } from "@/schemas/attachmentFormSchema";
import { Attachment, Course } from "@prisma/client";
import { CirclePlus, File, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type AttachmentFormProps = {
  initialData: Course & { attachments: Attachment[] };

  courseId: string;
};

export function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { toggleFn: toggleEditing } = useToggle({
    value: isEditing,
    setValue: setIsEditing,
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof attachmentFormSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course description updated successfully.");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course Attachment
        <Button
          onClick={toggleEditing}
          size={isEditing ? "sm" : "icon"}
          variant={"outline"}
          type="button"
          className="bg-transparent text-muted-foreground transition-all hover:rounded-2xl hover:border-black/50 hover:text-black"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && (
            <>
              <CirclePlus className="size-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm italic text-slate-500">
              No attachments uploaded yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
                >
                  <File className="mr-2 size-4 flex-shrink-0" />
                  <p className="line-clamp-1 flex-1 text-wrap text-xs">
                    <p className="max-w-[170px] overflow-hidden truncate">
                      {attachment.name}
                    </p>
                  </p>
                  {deletingId === attachment.id ? (
                    <div>
                      <Loader2 className="size-4 animate-spin" />
                    </div>
                  ) : (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto transition hover:opacity-75"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-6">
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url: url });
                }
              }}
            />
            <div className="mt-4 text-xs text-muted-foreground">
              Add anything that will help your students learn better
            </div>
          </div>
        </>
      )}
    </div>
  );
}
