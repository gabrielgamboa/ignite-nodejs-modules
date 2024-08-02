import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckInUseCase } from "@/use-cases/validate-checkin";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { LateCheckInValidationError } from "./errors/late-checkin-validation-error";

let checkInsRepository: CheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("ValidateCheckInUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate checkin", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-id",
      user_id: "user-id",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexisting checkin", async () => {
    await expect(
      sut.execute({
        checkInId: "invalid_checkin_id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it("should not be able to validate checkin after 20 minutes", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-id",
      user_id: "user-id",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(
      sut.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
