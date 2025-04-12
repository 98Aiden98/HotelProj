import _ from "lodash";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { trpc } from "../lib/trpc";
import { createMemoryTrpcRoute } from "./createMemory";
import { getMeTrpcRoute } from "./getMe";
import { getMemoriesTrpcRoute } from "./getMemories";
import { getMemoryTrpcRoute } from "./getMemory";
import { signInTrpcRoute } from "./signIn";
import { signUpTrpcRoute } from "./signUp";
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createMemory: createMemoryTrpcRoute,
  getMe: getMeTrpcRoute,
  getMemories: getMemoriesTrpcRoute,
  getMemory: getMemoryTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
