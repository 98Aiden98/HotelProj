import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { trpcRouter } from "./router";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { AppContext, createAppContext } from "./lib/ctx";
import { applyPassportToExpressApp } from "./lib/passport";

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

    expressApp.listen(3000, () => {
      console.info("Listening on http://localhost:3000");
    });
  } catch (e) {
    console.error(e);
    await ctx?.stop();
  }
})()
