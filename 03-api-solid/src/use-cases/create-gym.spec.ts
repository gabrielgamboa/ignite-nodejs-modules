import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: GymsRepository;
let sut: CreateGymUseCase;

describe("AuthenticateUseCase", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "gym-test",
      description: "description",
      latitude: 0,
      longitude: 0,
      phone: "12345689",
    });

    expect(gym).toBeDefined();
    expect(gym.id).toEqual(expect.any(String));
  });
});
