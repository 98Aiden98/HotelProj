import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";

export const getMemoryTrpcRoute = trpc.procedure
  .input(
    z.object({
      memoryId: z.string(),
    }),
  )
  .query(({ input }) => {
    const memory = memories.find((memory) => memory.name === input.memoryId);
    return { memory: memory || null };
  });
