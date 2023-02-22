import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generatePassword, hashPassword } from "../utils/password";

const difficultySchema = z.object({
  length: z.union([z.literal(6), z.literal(8), z.literal(12), z.literal(16)]),
  specialChars: z.boolean(),
  upperCase: z.boolean(),
  numbers: z.boolean(),
  hashingMethod: z.enum(["Argon2", "bcrypt", "scrypt"]),
  saltRounds: z.optional(z.number().int().max(15).min(10)),
});

export type difficulty = z.infer<typeof difficultySchema>;

export const hackerRouter = createTRPCRouter({
  newChallenge: publicProcedure
    .input(
      z.object({
        difficulty: difficultySchema,
      })
    )
    .query(async ({ input }) => {
      const password = generatePassword(input.difficulty);
      const hashedPassword = await hashPassword(password,input.difficulty)
      return hashedPassword;
    }),
});
