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
      page: 1,
    });

    expect(gyms).toHaveLength(1);
  });

  it("should be able to get nearby gyms paginated", async () => {
    for (let i = 1; i <= 22; i++) {
      gymsRepository.create({
        title: "Near Gym " + i,
        description: null,
        phone: null,
        latitude: -22.8277,
        longitude: -47.2698,
      });
    }

    const { gyms } = await sut.execute({
      userLatitude: -22.833763,
      userLogitude: -47.278396,
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym 21" }),
      expect.objectContaining({ title: "Near Gym 22" }),
    ]);
  });
});
