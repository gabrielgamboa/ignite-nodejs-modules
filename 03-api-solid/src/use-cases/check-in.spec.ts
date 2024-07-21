import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInRepository: CheckInsRepository;
let gymsRepository: GymsRepository;
let sut: CheckInUseCase;

describe("CheckInUseCase", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    gymsRepository.create({
      id: "gym_id",
      title: "gym-test",
      description: "description",
      latitude: 0,
      longitude: 0,
      phone: "12345689",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym_id",
      userId: "user_id",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toBeDefined();
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same date", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym_id",
      userId: "user_id",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym_id",
        userId: "user_id",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice in differente days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym_id",
      userId: "user_id",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym_id",
      userId: "user_id",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toBeDefined();
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    await expect(() =>
      sut.execute({
        gymId: "gym_id",
        userId: "user_id",
        userLatitude: -22.8171655,
        userLongitude: -47.3150732,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
