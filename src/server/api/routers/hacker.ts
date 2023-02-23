import { NodeNextResponse } from "next/dist/server/base-http/node";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generatePassword, hashPassword, verifyPassword } from "../utils/password";

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
    submitAnswer: publicProcedure.input(z.object({
      answer: z.string().max(16).min(6),
      difficulty: difficultySchema,
      challenge: z.string()
    })).query(async ({input}) => {
      const response = await verifyPassword(input.challenge,input.difficulty,input.answer)
      return response
    })
});
