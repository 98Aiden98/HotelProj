import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";
import _ from "lodash";

export const getMemoriesTrpcRoute = trpc.procedure.query(() => {
  return {
    memories: memories.map((memory) =>
      _.pick(memory, ["name", "nick", "description"]),
    ),
  };
});
