import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}


export class CheckInUseCase {
    constructor(
        private readonly checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const userHasAlreadyCheckInOnDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
        
        if (userHasAlreadyCheckInOnDate) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });
        return { checkIn };
    }
}