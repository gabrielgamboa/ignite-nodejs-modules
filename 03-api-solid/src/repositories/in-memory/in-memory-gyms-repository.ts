import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FindAllNearbyParams, GymsRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findAllNearby({
    latitude,
    longitude,
  }: FindAllNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      console.log(distance);

      return distance < 10; // 10km
    });
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
      .slice((page - 1) * 20, page * 20);
  }

  async findById(id: string): Promise<Gym | null> {
    const user = this.gyms.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }
}
