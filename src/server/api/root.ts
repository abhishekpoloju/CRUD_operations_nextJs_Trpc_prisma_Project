
import { subscribeRouter } from "~/server/api/routers/subScribe";
import { createTRPCRouter } from "~/server/api/trpc";
import { crudOperationsRouter } from "./routers/crudOperationsApi";
// import { exampleRouter } from "./routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subscribe: subscribeRouter,
  crudApi:crudOperationsRouter,
  // example:exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
