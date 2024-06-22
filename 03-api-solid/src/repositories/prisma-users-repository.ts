import { prisma } from "@/infra/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  }
}
