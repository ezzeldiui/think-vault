import * as z from "zod";

export const chapterFormSchema = z.object({
  title: z.string().min(1, { message: "Chapter is required" }),
});
