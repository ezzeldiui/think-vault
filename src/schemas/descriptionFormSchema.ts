import * as z from "zod";

export const descriptionFormSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
});
