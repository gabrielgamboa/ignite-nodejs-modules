import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface GetGymsUseCaseRequest {
  query: string;
  page: number;
}

interface GetGymsUseCaseResponse {
  gyms: Gym[];
}

export class GetGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
  }: GetGymsUseCaseRequest): Promise<GetGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.getAll(query, page);
    return { gyms };
  }
}
