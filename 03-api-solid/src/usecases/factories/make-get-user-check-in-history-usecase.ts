import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserCheckInsHistoryUseCase } from "../get-user-check-ins-history";

export function makeGetUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();

  return new GetUserCheckInsHistoryUseCase(checkInRepository);
}
