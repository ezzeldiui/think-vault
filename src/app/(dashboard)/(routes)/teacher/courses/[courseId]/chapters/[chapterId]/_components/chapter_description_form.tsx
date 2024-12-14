"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { chapterDescriptionFormSchema } from "@/schemas/chapterDescriptionFormSchema";
import { Chapter, Course } from "@prisma/client";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Preview } from "@/components/preview";

type ChapterDescriptionFormProps = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

export function ChapterDescriptionForm({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { toggleFn: toggleEditing } = useToggle({
    value: isEditing,
    setValue: setIsEditing,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof chapterDescriptionFormSchema>>({
    resolver: zodResolver(chapterDescriptionFormSchema),
    defaultValues:
      initialData === null
        ? { description: "" }
        : { description: initialData.description ?? "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (
    values: z.infer<typeof chapterDescriptionFormSchema>,
  ) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter description updated successfully.");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Description
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
            !initialData.description && "text-muted-foreground/50",
          )}
        >
          {!initialData.description && "Add a chapter description"}
          {initialData.description && (
            <Preview value={initialData.description} />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
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
