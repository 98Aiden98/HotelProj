import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import _ from "lodash";
import { trpc } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from "./auth/getMe";
import { signInTrpcRoute } from "./auth/signIn";
import { signUpTrpcRoute } from "./auth/signUp";
import { createMemoryTrpcRoute } from "./memories/createMemory";
import { getMemoriesTrpcRoute } from "./memories/getMemories";
import { getMemoryTrpcRoute } from "./memories/getMemory";
import { updateMemoryTrpcRoute } from "./memories/updateMemory";
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  createMemory: createMemoryTrpcRoute,
  getMemories: getMemoriesTrpcRoute,
  getMemory: getMemoryTrpcRoute,
  updateMemory: updateMemoryTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
