import * as z from "zod";

export const titleFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be less than 50 characters" }),
});
