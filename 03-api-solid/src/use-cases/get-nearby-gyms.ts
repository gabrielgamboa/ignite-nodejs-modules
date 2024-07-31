import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

export interface GetNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLogitude: number;
  page: number;
}

export interface GetNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class GetNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLogitude,
    page,
  }: GetNearbyGymsUseCaseRequest): Promise<GetNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findAllNearby({
      latitude: userLatitude,
      longitude: userLogitude,
      page,
    });

    return { gyms };
  }
}
