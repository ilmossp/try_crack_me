import { faker } from "@faker-js/faker";
import { difficulty } from "../routers/hacker";
import * as bcrypt from "bcrypt";

const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
const letters = "abcdefghijklmnopqrstuvwxyz";

function shuffle(length: number) {
  const result = "";
  while (result.length < length) {
    result + letters[Math.floor(Math.random() * 26)];
  }
  return result;
}

function generatePassword(params: difficulty) {
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
  let password = "";
  const characters =
    letters + letters.toUpperCase() + specialChars + "1234567890";
  for (let i = 0; i < 16; i++) {
    password =
      password +
      characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

async function hashPassword(password: string, params: difficulty) {
  switch (params.hashingMethod) {
    case "bcrypt":
      if (params.salt) {
        const salt = await bcrypt.genSalt(params.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      }
      const hashedPassword = await bcrypt.hash(password, 0);
      return hashedPassword;
    case "Argon2":
      break;
    case "scrypt":
      break;
  }
}

export { generatePassword, hashPassword };
