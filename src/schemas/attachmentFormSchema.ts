import * as z from "zod";

export const attachmentFormSchema = z.object({
  url: z.string().min(1, { message: "Attachment is required" }),
});
