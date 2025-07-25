import { PrismaClient } from "../generated/prisma/client";
import { CreateUserInput } from "../schemas/user.schema";
import { hashPassword } from "../utils/password";

const prisma = new PrismaClient();

export async function createUser(input: CreateUserInput) {
  const hashedPassword = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}
