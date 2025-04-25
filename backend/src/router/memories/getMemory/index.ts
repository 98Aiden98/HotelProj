import _ from "lodash";
import { z } from "zod";
import { memories } from "../../../lib/memories";
import { trpc } from "../../../lib/trpc";

export const getMemoryTrpcRoute = trpc.procedure
  .input(
    z.object({
      memoryId: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const rawMemory = await ctx.prisma.memory.findUnique({
      where: {
        nick: input.memoryId,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        memoriesLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            memoriesLikes: true,
          },
        },
      },
    });

    const isLikedByMe = !!rawMemory?.memoriesLikes.length;
    const likesCount = rawMemory?._count.memoriesLikes || 0;
    const memory = rawMemory && {
      ..._.omit(rawMemory, ["memoriesLikes", "_count"]),
      isLikedByMe,
      likesCount,
    };
    return { memory };
  });
