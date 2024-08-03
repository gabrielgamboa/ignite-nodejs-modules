import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/infra/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    });

    return checkIn;
  }

  async save(data: CheckIn): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.update({
      data,
      where: { id: data.id },
    });

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gt: startOfDay.toDate(),
          lt: endOfDay.toDate(),
        },
      },
    });

    return checkIn;
  }
}
