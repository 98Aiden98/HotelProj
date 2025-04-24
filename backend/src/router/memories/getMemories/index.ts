import _ from "lodash";
import { z } from "zod";
import { memories } from "../../../lib/memories";
import { trpc } from "../../../lib/trpc";
import { zGetMemoriesTrpcInput } from "./input";

export const getMemoriesTrpcRoute = trpc.procedure
  .input(zGetMemoriesTrpcInput)
  .query(async ({ ctx, input }) => {
    const memories = await ctx.prisma.memory.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        createdAt: true,
        serialNumber: true,
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
    const nextMemory = memories.at(input.limit);
    const nextCursor = nextMemory?.serialNumber;
    const memoriesExceptNext = memories.slice(0, input.limit);
    //console.log("memories", memories);
    return { memories: memoriesExceptNext, nextCursor };
  });
