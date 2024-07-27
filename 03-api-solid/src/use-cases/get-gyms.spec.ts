import { beforeEach, describe, expect, it } from "vitest";
import { GetGymsUseCase } from "./get-gyms";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let sut: GetGymsUseCase;
let gymsRepository: GymsRepository;

describe("GetGymsUseCase", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetGymsUseCase(gymsRepository);
  });

  it("should be able to get gyms", async () => {
    gymsRepository.create({
      title: "gym-test",
      latitude: 0,
      longitude: 0,
      phone: "12345689",
    });

    gymsRepository.create({
      title: "gym-test2",
      latitude: 0,
      longitude: 0,
      phone: "12345689",
    });

    const { gyms } = await sut.execute({ page: 1, query: "gym-test2" });
    expect(gyms).toHaveLength(1);
  });

  it("should be able to get gyms paginated correctly", async () => {
    for (let i = 1; i <= 22; i++) {
      gymsRepository.create({
        title: `gym-test${i}`,
        latitude: 0,
        longitude: 0,
        phone: "123456789",
      });
    }

    const { gyms } = await sut.execute({ page: 2, query: "-test" });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "gym-test21",
      }),
      expect.objectContaining({
        title: "gym-test22",
      }),
    ]);
  });
});
