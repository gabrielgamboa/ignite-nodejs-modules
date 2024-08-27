import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();

  return new GetUserMetricsUseCase(checkInRepository);
}
