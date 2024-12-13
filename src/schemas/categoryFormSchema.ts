import * as z from "zod";

export const categoryFormSchema = z.object({
  categoryId: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
});
