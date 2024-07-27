import { Gym, Prisma } from "@prisma/client";

export interface FindAllNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  findAllNearby(params: FindAllNearbyParams): Promise<Gym[]>;
  getAll(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
