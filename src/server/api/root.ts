import { createTRPCRouter } from "./trpc";
import { hackerRouter } from "./routers/hacker";
import { clientRouter } from "./routers/client";


export const Router = createTRPCRouter({
  hacker: hackerRouter,
  client: clientRouter
});

// export type definition of API
export type AppRouter = typeof Router;
