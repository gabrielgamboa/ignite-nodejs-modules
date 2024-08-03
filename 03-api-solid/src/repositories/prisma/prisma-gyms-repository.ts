import { Gym, Prisma } from "@prisma/client";
import { FindAllNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/infra/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return prisma.gym.findUnique({
      where: { id },
    });
  }

  async findAllNearby({
    latitude,
    longitude,
    page,
  }: FindAllNearbyParams): Promise<Gym[]> {
    // get gyms in 10km
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT 20
      OFFSET ((${page} - 1) * 20)
    `;

    return gyms;
  }

  async getAll(query: string, page: number): Promise<Gym[]> {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return prisma.gym.create({ data });
  }
}
