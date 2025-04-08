import { initTRPC } from "@trpc/server";
import _ from "lodash"
import {z} from "zod"

const memories = _.times(100, (i)=>({
  id: `head${i}`,
  name: `Header${i}`,
  description: `This is the header number ${i}`,
  text: _.times(20, (j)=>`<p>Text paragraph ${j} of memory ${i}...</p>`).join('')
}))



const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getMemories: trpc.procedure.query(() => {
    return { memories: memories.map((memory)=> _.pick(memory, ['id', 'name', 'description'])) };
  }),
  getMemory: trpc.procedure.input(
    z.object({
      memoryId: z.string()
    })
  ).query(({input}) => {
    const memory = memories.find((memory)=> memory.id===input.memoryId)
    return {memory: memory || null} 
  })
});

export type TrpcRouter = typeof trpcRouter;
