"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { chapterFormSchema } from "@/schemas/chapterFormSchema";
import { Chapter, Course } from "@prisma/client";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ChaptersFormProps = {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
};

export function ChaptersForm({ initialData, courseId }: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { toggleFn: toggleCreating } = useToggle({
    value: isCreating,
    setValue: setIsCreating,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof chapterFormSchema>>({
    resolver: zodResolver(chapterFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof chapterFormSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created successfully.");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course Chapters
        <Button
          onClick={toggleCreating}
          size={isCreating ? "sm" : "icon"}
          variant={"outline"}
          type="button"
          className="bg-transparent text-muted-foreground transition-all hover:rounded-2xl hover:border-black/50 hover:text-black"
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="size-4" />
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        placeholder="e.g. 'Introduction to the course'"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
        </>
      )}

      {!isCreating && (
        <div
          className={cn(
            "mb-2 mt-4 text-sm",
            !initialData.chapters.length && "italic text-slate-500",
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          {/* TODO: Add a list of chapter */}
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
}
