import _ from "lodash";
import { z } from "zod";
import { memories } from "../../../lib/memories";
import { trpc } from "../../../lib/trpc";
import { zGetMemoriesTrpcInput } from "./input";

export const getMemoriesTrpcRoute = trpc.procedure
  .input(zGetMemoriesTrpcInput)
  .query(async ({ ctx, input }) => {
    const rawMemories = await ctx.prisma.memory.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        createdAt: true,
        serialNumber: true,
        _count: {
          select: {
            memoriesLikes: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          serialNumber: "desc",
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });
    const nextMemory = rawMemories.at(input.limit);
    const nextCursor = nextMemory?.serialNumber;
    const rawMemoriesExceptNext = rawMemories.slice(0, input.limit);
    const memoriesExceptNext = rawMemoriesExceptNext.map((memory) => ({
      ..._.omit(memory, ["_count"]),
      likesCount: memory._count.memoriesLikes,
    }));
    //console.log("memories", memories);
    return { memories: memoriesExceptNext, nextCursor };
  });
