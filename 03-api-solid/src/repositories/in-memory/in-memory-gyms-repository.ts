import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { GymsRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymsRepository implements GymsRepository {
  public users: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const user: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude as number),
      longitude: new Decimal(data.longitude as number),
    };

    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<Gym | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }
}
