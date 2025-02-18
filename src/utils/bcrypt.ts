import { genSalt, hash, compare } from "bcryptjs";

export async function hashPassword(plainTextPassword: string) {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Hashing password failed");
  }
}

export async function comparePassword(input: {
  plainTextPassword: string;
  hashedPassword: string;
}) {
  const isCompared = await compare(
    input.plainTextPassword,
    input.hashedPassword
  );

  return isCompared;
}
