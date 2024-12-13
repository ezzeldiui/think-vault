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
import { Textarea } from "@/components/ui/textarea";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { categoryFormSchema } from "@/schemas/categoryFormSchema";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

type CategoryFormProps = {
  initialData: {
    categoryId: string | null;
  };
  courseId: string;
  options: { label: string; value: string }[];
};

export function CategoryForm({
  initialData,
  courseId,
  options,
}: CategoryFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { toggleFn: toggleEditing } = useToggle({
    value: isEditing,
    setValue: setIsEditing,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues:
      initialData === null
        ? { categoryId: "" }
        : { categoryId: initialData.categoryId ?? "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof categoryFormSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated successfully.");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId,
  );

  return (
    <div className="group mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course Category
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
        <p
          className={cn(
            "max-w-[500px] truncate text-wrap text-sm text-muted-foreground/50 transition-all group-hover:text-muted-foreground",
            !initialData.categoryId && "text-muted-foreground/50",
          )}
        >
          {selectedOption?.label || "Add a category"}
        </p>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox {...field} options={options} />
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
