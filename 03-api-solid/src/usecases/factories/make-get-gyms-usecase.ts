import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { GetGymsUseCase } from "../get-gyms";

export function makeGetGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  return new GetGymsUseCase(gymsRepository);
}
