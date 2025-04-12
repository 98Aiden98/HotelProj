import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { AppContext, createAppContext } from "./lib/ctx";
import { env } from "./lib/env";
import { applyPassportToExpressApp } from "./lib/passport";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { trpcRouter } from "./router";

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();

    const expressApp = express();
    expressApp.use(cors());
    expressApp.get("/ping", (req, res) => {
      res.send("pong");
    });

    applyPassportToExpressApp(expressApp, ctx);
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => {
      console.info(`Listening on http://localhost:${env.PORT}`);
    });
  } catch (e) {
    console.error(e);
    await ctx?.stop();
  }
})();
