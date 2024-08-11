import { beforeEach, describe, expect, it } from "vitest";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: CheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("GetUserMetricsUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get user metrics", async () => {
    checkInsRepository.create({
      user_id: "any_id",
      gym_id: "gym_id",
    });

    checkInsRepository.create({
      user_id: "any_id",
      gym_id: "gym_id2",
    });

    const { checkInsCount } = await sut.execute({ userId: "any_id" });
    expect(checkInsCount).toEqual(2);
  });
});
