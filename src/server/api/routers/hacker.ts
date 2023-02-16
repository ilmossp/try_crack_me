import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { faker } from "@faker-js/faker";
import { NONAME } from "dns";
const difficultySchema = z.object({
  length: z.union([z.literal(6), z.literal(8), z.literal(12), z.literal(16)]),
  specialChars: z.boolean(),
  upperCase: z.boolean(),
  numbers: z.boolean(),
  hashingMethod: z.enum(["Argon2", "bcrypt", "scrypt"]),
  salt: z.boolean(),
  saltRounds: z.optional(z.number().int().max(10).min(0)),
});

export const hackerRouter = createTRPCRouter({
  newChallenge: publicProcedure
    .input(
      z.object({
        difficulty: difficultySchema,
      })
    )
    .query(({ input }) => {
      const password = generatePassword(input.difficulty)
      return { message: `password is : ${password}` };
    }),
});








function generatePassword(params: z.infer<typeof difficultySchema>) {
  if (params.length !== 16) {
    let name = faker.name.fullName().replaceAll(" ", "");
    if (!params.upperCase) name = name.toLowerCase();
    if(name.length>params.length){
      name = name.slice(0,params.length-1)
    }
    if(name.length<params.length){
        name = name.padEnd(params.length,Math.floor(Math.random()*100).toString())
    }
    return name
  }

}
