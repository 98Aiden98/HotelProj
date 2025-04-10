import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";
import { zCreateMemoryTrpcInput } from "./input";

export const createMemoryTrpcRoute = trpc.procedure
  .input(zCreateMemoryTrpcInput)
  .mutation(({ input }) => {
    memories.unshift(input);
    return true;
  });
