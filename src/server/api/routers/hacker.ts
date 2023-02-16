import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { faker } from "@faker-js/faker";

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
      const password = generatePassword(input.difficulty);
      return { message: `password is : ${password}` };
    }),
});

function generatePassword(params: z.infer<typeof difficultySchema>) {
  if (params.length !== 16) {
    let name = faker.name.fullName().replaceAll(" ", "");
    if (!params.upperCase) name = name.toLowerCase();
    if (name.length > params.length) {
      name = name.slice(0, params.length - 1);
    }
    if (name.length < params.length) {
      const padding = params.numbers
        ? Math.floor(Math.random() * 100).toString()
        : shuffle(params.length - name.length);
      name = name.padEnd(params.length, padding);
    }
    if (params.specialChars) {
      let nameArray = name.split("");
      for (let i = 0; i < name.length / 5; i++) {
        nameArray[Math.floor(Math.random() * name.length)] =
          specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      }
      name = nameArray.join("");
    }

    return name;
  }
}

const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
const letters = "abcdefghijklmnopqrstuvwxyz";
function shuffle(length: number) {
  const result = "";
  while (result.length < length) {
    result + letters[Math.floor(Math.random() * 26)];
  }
  return result;
}
