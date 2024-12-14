import * as z from "zod";

export const videoFormSchema = z.object({
  videoUrl: z.string().min(1),
});
