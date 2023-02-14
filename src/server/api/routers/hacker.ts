import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const hackerRouter = createTRPCRouter({
  challenge: publicProcedure
    .input(
      z.object({
        difficulty: z.object({
            length: z.union([z.literal(6),z.literal(8),z.literal(12),z.literal(16)]),
            specialChars: z.boolean(),
            upperCase: z.boolean(),
            numbers: z.boolean(),
            hashingMethod: z.enum(["Argon2","bcrypt","scrypt"]),
            salt: z.boolean(),
            saltRounds: z.optional(z.number().int().max(10).min(0))
        }),
      })
    )
    .query(({ input }) => {
      return { message: `so you have chosen ${input.difficulty}` };
    }),
});
