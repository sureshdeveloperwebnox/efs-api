import bcrypt from "bcrypt";

export async function generateHashPassword(): Promise<{ password: string; hashedPassword: string }> {
  const salt = await bcrypt.genSalt(10);
  const password = Math.floor(Math.random() * 9000 + 1000).toString(); // Generates a 4-digit password
  const hashedPassword = await bcrypt.hash(password, salt);

  return { password, hashedPassword };
}
