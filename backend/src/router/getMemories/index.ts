import _ from "lodash";
import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";

export const getMemoriesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const memories = await ctx.prisma.memory.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("memories", memories);
  return { memories };
});
