import { faker } from "@faker-js/faker";
import { difficulty } from "../routers/hacker";
import * as bcrypt from "bcrypt";
import * as argon from "argon2";
import { scrypt, timingSafeEqual, randomBytes } from "crypto";
import { promisify } from "util";

const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
const letters = "abcdefghijklmnopqrstuvwxyz";

function shuffle(length: number) {
  let result = "";
  while (result.length < length) {
    result += letters[Math.floor(Math.random() * 26)];
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
  let salt;
  let hashedPassword;
  switch (params.hashingMethod) {
    case "bcrypt":
      salt = await bcrypt.genSalt(params.saltRounds);
      hashedPassword = bcrypt.hash(password, salt);
      return hashedPassword;
    case "Argon2":
      salt = randomBytes(16).toString("hex");
      hashedPassword = await argon.hash(password + salt);
      return hashedPassword;
    case "scrypt":
      hashedPassword = await scryptHash(password);
      return hashedPassword;
  }
}

async function verifyPassword(
  password: string,
  params: difficulty,
  answer: string
) {
  let result: boolean;
  switch (params.hashingMethod) {
    case "bcrypt":
      result = await bcrypt.compare(password, answer);
      return result;
    case "Argon2":
      result = await argon.verify(answer, password);
      return result;
    case "scrypt":
      result = await scryptVerify(answer, password);
  }
}

const scryptPromise = promisify(scrypt);

async function scryptHash(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptPromise(password, salt, 64);
  return salt + ":" + (derivedKey as Buffer).toString("hex");
}

async function scryptVerify(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(":");
  if (salt && key) {
    const bufferKey = Buffer.from(key);
    const derivedKey = await scryptPromise(password, salt, 64);
    return timingSafeEqual(bufferKey, derivedKey as Buffer);
  }
  return false;
}

export { generatePassword, hashPassword, verifyPassword };
