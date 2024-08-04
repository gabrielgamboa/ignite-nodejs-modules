import { AuthenticateUseCase } from "../authenticate";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export const makeAuthenticateUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  return authenticateUseCase;
};
