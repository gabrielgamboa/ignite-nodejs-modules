import { beforeEach, describe, expect, it } from "vitest";
import { GetNearbyGymsUseCase } from "./get-nearby-gyms";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let sut: GetNearbyGymsUseCase;
let gymsRepository: GymsRepository;

describe("GetNearbyGymsUseCase", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to get nearby gyms", async () => {
    gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -22.8277,
      longitude: -47.2698,
    });

    gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -22.7550308,
      longitude: -47.5267552,
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.833763,
      userLogitude: -47.278396,
    });

    expect(gyms).toHaveLength(1);
  });
});
