import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";

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
        private readonly gymsRepository: GymsRepository,
    ) {}

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if(!gym) throw new ResourceNotFound();
        
        const userHasAlreadyCheckInOnDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
        
        if (userHasAlreadyCheckInOnDate) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });
        return { checkIn };
    }
}