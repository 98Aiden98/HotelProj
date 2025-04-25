import { z } from "zod";

export const zSetMemoryLikeTrpcInput = z.object({
  memoryId: z.string().min(1),
  isLikedByMe: z.boolean(),
});
