"use client";

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type VideoPlayerProps = {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
};

export function VideoPlayer({
  chapterId,
  completeOnEnd,
  courseId,
  isLocked,
  playbackId,
  title,
  nextChapterId,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState<boolean>();

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div
          className={cn(
            isReady && "hidden",
            "absolute inset-0 flex items-center justify-center bg-slate-800",
          )}
        >
          <Loader className="size-4 animate-spin text-secondary" />
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="size-8" />
          <p className="max-w-xs text-balance text-center text-xs">
            This chapter is locked. Please purchase the course to watch this
            chapter.
          </p>
        </div>
      )}
    </div>
  );
}
``