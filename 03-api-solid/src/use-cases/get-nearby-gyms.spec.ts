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
      latitude: -22.8307241,
      longitude: -47.2822857,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLogitude: -47.2787688,
    });

    expect(gyms).toHaveLength(1);
  });
});
