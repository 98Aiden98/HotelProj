import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";

export const getMemoryTrpcRoute = trpc.procedure
  .input(
    z.object({
      memoryId: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const memory = await ctx.prisma.memory.findUnique({
      where: {
        nick: input.memoryId,
      },
    })
    return { memory};
  });
