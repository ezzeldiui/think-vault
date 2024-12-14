"use client";

import axios from "axios";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import { videoFormSchema } from "@/schemas/videoFormSchema";
import { Chapter, MuxData } from "@prisma/client";
import { CirclePlus, Pencil, VideoIcon } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ChapterVideoFormProps = {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

export function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { toggleFn: toggleEditing } = useToggle({
    value: isEditing,
    setValue: setIsEditing,
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof videoFormSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter video updated successfully.");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Video
        <Button
          onClick={toggleEditing}
          size={isEditing ? "sm" : "icon"}
          variant={"outline"}
          type="button"
          className="bg-transparent text-muted-foreground transition-all hover:rounded-2xl hover:border-black/50 hover:text-black"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <CirclePlus className="size-4" />
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="size-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData?.videoUrl ? (
          <div className="mt-6 flex h-60 items-center justify-center rounded-md bg-slate-200">
            <VideoIcon className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              loop
              muted
              style={{ borderRadius: "0.5rem" }}
            />
          </div>
        )
      ) : (
        <>
          <div className="mt-6">
            <FileUpload
              endpoint="chapterVideo"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
            <div className="mt-4 text-xs text-muted-foreground">
              Upload a video for this chapter.
            </div>
          </div>
        </>
      )}
      {initialData?.videoUrl && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Video can take a few minutes to process. Refresh the page if the video
          does not appear.
        </div>
      )}
    </div>
  );
}
