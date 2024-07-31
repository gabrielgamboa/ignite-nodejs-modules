import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FindAllNearbyParams, GymsRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

const ITEMS_PER_PAGE = 20;

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findAllNearby({
    latitude,
    longitude,
    page,
  }: FindAllNearbyParams): Promise<Gym[]> {
    return this.gyms
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          { latitude, longitude },
          {
            latitude: item.latitude.toNumber(),
            longitude: item.longitude.toNumber(),
          }
        );

        return distance < 10; // 10km
      })
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const user: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude as number),
      longitude: new Decimal(data.longitude as number),
    };

    this.gyms.push(user);
    return user;
  }

  async getAll(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }

  async findById(id: string): Promise<Gym | null> {
    const user = this.gyms.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }
}
