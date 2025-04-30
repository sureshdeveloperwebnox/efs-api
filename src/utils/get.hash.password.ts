import bcrypt from "bcrypt";

export async function getHashPassword(password: string): Promise<{ hashedPassword: string }> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return { hashedPassword };
}
