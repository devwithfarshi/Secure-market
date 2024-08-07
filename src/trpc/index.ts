import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    console.log("first ");
    return "Hello";
  }),
});

export type TAppRouter = typeof appRouter;
