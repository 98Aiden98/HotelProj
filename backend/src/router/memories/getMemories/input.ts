import { z } from "zod";

export const zGetMemoriesTrpcInput = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1).max(100).default(10),
});
