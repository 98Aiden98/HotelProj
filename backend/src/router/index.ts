import _ from "lodash";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createMemoryTrpcRoute } from './createMemory'
import { getMemoriesTrpcRoute } from './getMemories'
import { getMemoryTrpcRoute } from './getMemory'
// @endindex
import { trpc } from "../lib/trpc";

export const trpcRouter = trpc.router({
// @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
createMemory: createMemoryTrpcRoute,
getMemories: getMemoriesTrpcRoute,
getMemory: getMemoryTrpcRoute,
// @endindex
});

export type TrpcRouter = typeof trpcRouter;