import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";
import _ from "lodash";

export const getMemoriesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const memories = await ctx.prisma.memory.findMany({
    select: {
      id: true,
      name: true,
      nick: true,
      description: true,
    },
  });
  return { memories };
});
