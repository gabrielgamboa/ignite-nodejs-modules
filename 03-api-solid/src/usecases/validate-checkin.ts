import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";
import { ResourceNotFound } from "./errors/resource-not-found";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { LateCheckInValidationError } from "./errors/late-checkin-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFound();
    // throw error if checkin is after 20 minutes
    const differenceInMinutes = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (differenceInMinutes > 20) throw new LateCheckInValidationError();
    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
