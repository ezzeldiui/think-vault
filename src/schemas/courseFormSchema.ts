import * as z from "zod";

export const courseFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title is too short" })
    .max(50, { message: "Title is too long" }),
});
