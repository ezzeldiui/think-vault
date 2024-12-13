import * as z from "zod";

export const priceFormSchema = z.object({
  price: z.coerce.number().min(0).max(100),
});
