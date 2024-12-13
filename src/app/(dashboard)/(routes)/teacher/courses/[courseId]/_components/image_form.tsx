"use client";

import axios from "axios";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import { imageFormSchema } from "@/schemas/imageFormSchema";
import { CirclePlus, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ImageFormProps = {
  initialData: {
    imageUrl: string | null;
  };
  courseId: string;
};

export function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { toggleFn: toggleEditing } = useToggle({
    value: isEditing,
    setValue: setIsEditing,
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof imageFormSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated successfully.");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course Image
        <Button
          onClick={toggleEditing}
          size={isEditing ? "sm" : "icon"}
          variant={"outline"}
          type="button"
          className="bg-transparent text-muted-foreground transition-all hover:rounded-2xl hover:border-black/50 hover:text-black"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.imageUrl && (
            <>
              <CirclePlus className="size-4" />
            </>
          )}

          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="size-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData?.imageUrl ? (
          <div className="mt-6 flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Uplaod"
              fill
              className="rounded-md object-cover"
              src={initialData.imageUrl}
            />
          </div>
        )
      ) : (
        <>
          <div className="mt-6">
            <FileUpload
              endpoint="courseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="mt-4 text-xs text-muted-foreground">
              16:9 aspect ratio recommended
            </div>
          </div>
        </>
      )}
    </div>
  );
}
