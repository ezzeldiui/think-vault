import * as z from "zod";

export const chapterTitleFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Chapter Title is required" })
    .max(25, { message: "Title must be less than 25 characters" }),
});
