import { trpc } from "../../../lib/trpc";
import { zSetMemoryLikeTrpcInput } from "./input";

export const setMemoryLikeTrpcRoute = trpc.procedure
  .input(zSetMemoryLikeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { memoryId, isLikedByMe } = input;
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }
    const memory = await ctx.prisma.memory.findUnique({
      where: {
        id: memoryId,
      },
    });
    if (!memory) {
      throw new Error("NOT_FOUND");
    }
    if (isLikedByMe) {
      await ctx.prisma.memoryLike.upsert({
        where: {
          memoryId_userId: {
            memoryId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          memoryId,
        },
        update: {},
      });
    } else {
      await ctx.prisma.memoryLike.delete({
        where: {
          memoryId_userId: {
            memoryId,
            userId: ctx.me.id,
          },
        },
      });
    }
    const likesCount = await ctx.prisma.memoryLike.count({
      where: {
        memoryId,
      },
    });
    return {
      idea: {
        id: memory.id,
        likesCount,
        isLikedByMe,
      },
    };
  });
