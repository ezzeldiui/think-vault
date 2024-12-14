"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { chapterAccessFormSchema } from "@/schemas/chapterAccessFormSchema";
import { Chapter } from "@prisma/client";
import { Eye, EyeClosed, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

type ChapterAccessFormProps = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

export function ChapterAccessForm({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { toggleFn: toggleEditing } = useToggle({
    value: isEditing,
    setValue: setIsEditing,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof chapterAccessFormSchema>>({
    resolver: zodResolver(chapterAccessFormSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof chapterAccessFormSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter access updated successfully.");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Access Settings
        <Button
          onClick={toggleEditing}
          size={isEditing ? "sm" : "icon"}
          variant={"outline"}
          type="button"
          className="bg-transparent text-muted-foreground transition-all hover:rounded-2xl hover:border-black/50 hover:text-black"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="size-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "max-w-[500px] truncate text-wrap text-sm text-muted-foreground/50 transition-all group-hover:text-muted-foreground",
            !initialData.isFree && "text-muted-foreground/50",
          )}
        >
          {initialData.isFree ? (
            <div className="flex gap-x-2">
              <Eye className="size-4" />
              This chapter is free for preview.
            </div>
          ) : (
            <div className="flex gap-x-2">
              <EyeClosed className="size-4" />
              This chapter is not free for preview.
            </div>
          )}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="rouned-md flex flex-row items-start space-x-3 space-y-0 border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        Check this box if this chapter is free for preview.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
