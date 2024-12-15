import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { Book, DollarSignIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type CourseCardProps = {
  item: {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
  };
};

export function CourseCard({ item }: CourseCardProps) {
  const { id, title, imageUrl, chaptersLength, price, progress, category } =
    item;

  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-lg">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image fill className="object-cover" alt="title" src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge icon={Book} size={"sm"} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {progress === null ? (
            <div>{/* TODO: Progress component */}</div>
          ) : (
            <>
              <Badge className="flex w-fit text-xs">{price} USD</Badge>

              {/* <Button className="mt-2">
                <span>Buy Now</span>
              </Button> */}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
