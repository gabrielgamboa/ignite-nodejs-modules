import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) { }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFound();

    const userHasAlreadyCheckInOnDate =
      await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (userHasAlreadyCheckInOnDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceError();

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });
    return { checkIn };
  }
}
