import * as z from "zod";

export const chapterDescriptionFormSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Chapter Description is required" })
    .max(500, {
      message: "Chapter Description must be less than 500 characters",
    }),
});
