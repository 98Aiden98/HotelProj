import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";
import { zCreateMemoryTrpcInput } from "./input";

export const createMemoryTrpcRoute = trpc.procedure
  .input(zCreateMemoryTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw Error("Non authenticated");
    }

    const exMemory = await ctx.prisma.memory.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exMemory) {
      throw new Error("Memory with this nick already exists");
    }

    await ctx.prisma.memory.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    });

    return true;
  });
