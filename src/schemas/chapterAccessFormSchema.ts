import * as z from "zod";

export const chapterAccessFormSchema = z.object({
  isFree: z.boolean().default(false),
});
