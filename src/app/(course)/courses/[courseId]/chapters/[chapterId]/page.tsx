import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

type ChapterIdProps = {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
};

export default async function ChapterIdPage({ params }: ChapterIdProps) {
  const { userId } = await auth();

  const { courseId, chapterId } = await params;

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    attachments,
    course,
    muxData,
    nextChapter,
    purchase,
    userProgress,
  } = await getChapter({ userId, courseId, chapterId });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !purchase && !chapter.isFree;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div className="-mt-20">
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter"
        />
      )}
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
    </div>
  );
}
