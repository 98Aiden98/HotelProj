import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import _ from "lodash";
import { trpc } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createMemoryTrpcRoute } from "./createMemory";
import { getMeTrpcRoute } from "./getMe";
import { getMemoriesTrpcRoute } from "./getMemories";
import { getMemoryTrpcRoute } from "./getMemory";
import { signInTrpcRoute } from "./signIn";
import { signUpTrpcRoute } from "./signUp";
import { updateMemoryTrpcRoute } from "./updateMemory";
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createMemory: createMemoryTrpcRoute,
  getMe: getMeTrpcRoute,
  getMemories: getMemoriesTrpcRoute,
  getMemory: getMemoryTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateMemory: updateMemoryTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
