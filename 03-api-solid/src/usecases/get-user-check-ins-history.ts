import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

export class GetUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: GetUserCheckInsHistoryUseCaseRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
