import { trpc } from "../../lib/trpc";
import { zUpdateMemoryTrpcInput } from "./input";

export const updateMemoryTrpcRoute = trpc.procedure
  .input(zUpdateMemoryTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { memoryId, ...memoryInput } = input;
    if (!ctx.me) {
      throw Error("Non authenticated");
    }
    const memory = await ctx.prisma.memory.findUnique({
      where: {
        id: memoryId,
      },
    });
    if (!memory) {
      throw new Error("Memory not found");
    }
    if (ctx.me.id != memory.authorId) {
      throw new Error("You are not the author of this memory");
    }
    if (memory.nick !== input.nick) {
      const exMemory = await ctx.prisma.memory.findUnique({
        where: {
          nick: input.nick,
        },
      });
      if (exMemory) {
        throw new Error("Memory with this nick already exists");
      }
    }

    await ctx.prisma.memory.update({
      where: {
        id: memoryId,
      },
      data: {
        ...memoryInput,
      },
    });
    return true;
  });
