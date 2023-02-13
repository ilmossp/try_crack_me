import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";


export const Router = createTRPCRouter({
  router: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof Router;
