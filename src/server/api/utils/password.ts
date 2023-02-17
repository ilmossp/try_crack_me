import { faker } from "@faker-js/faker";
import { difficulty } from "../routers/hacker";
import * as bcrypt from "bcrypt";
import * as argon from "argon2";

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

function hashPassword(password: string, params: difficulty) {
  let salt;
  let hashedPassword;
  switch (params.hashingMethod) {
    case "bcrypt":
      salt = bcrypt.genSaltSync(params.saltRounds);
      hashedPassword = bcrypt.hashSync(password, salt);
      return hashedPassword;

    case "Argon2":
      salt = crypto.getRandomValues(new Uint32Array(10)).toString();
      hashedPassword = argon.hash(password + salt);
      return hashedPassword;
    case "scrypt":
      
    break;
  }
}

export { generatePassword, hashPassword };
