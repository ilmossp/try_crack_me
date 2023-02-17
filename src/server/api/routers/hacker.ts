import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generatePassword } from "../utils/password";

const difficultySchema = z.object({
  length: z.union([z.literal(6), z.literal(8), z.literal(16),z.literal(24)]),
  specialChars: z.boolean(),
  upperCase: z.boolean(),
  numbers: z.boolean(),
  hashingMethod: z.enum(["Argon2", "bcrypt", "scrypt"]),
  salt: z.boolean(),
  saltRounds: z.optional(z.number().int().max(15).min(10)),
});

export const hackerRouter = createTRPCRouter({
  newChallenge: publicProcedure
    .input(
      z.object({
        difficulty: difficultySchema,
      })
    )
    .query(({ input }) => {
      const password = generatePassword(input.difficulty);
      return { message: `password is : ${password} and its ${password.length} characters long` };
    }),
});


