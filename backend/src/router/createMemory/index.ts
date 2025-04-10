import { z } from "zod";
import { memories } from "../../lib/memories";
import { trpc } from "../../lib/trpc";
import { zCreateMemoryTrpcInput } from "./input";

export const createMemoryTrpcRoute = trpc.procedure
  .input(zCreateMemoryTrpcInput)
  .mutation(({ input }) => {
    if(memories.find((memory) => memory.nick === input.nick)){
      throw Error("Memory with this nick already exists");
    }
    memories.unshift(input);
    return true;
  });
