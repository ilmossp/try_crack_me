import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const hackerRouter = createTRPCRouter({
  challenge: publicProcedure
    .input(
      z.object({
        difficulty: z.enum(["easy", "medium", "hard"]),
      })
    )
    .query(({ input }) => {
      return { message: `so you have chosen ${input.difficulty}` };
    }),
});
