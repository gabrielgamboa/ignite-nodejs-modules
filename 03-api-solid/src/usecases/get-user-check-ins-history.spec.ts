import { beforeEach, describe, expect, it } from "vitest";
import { GetUserCheckInsHistoryUseCase } from "./get-user-check-ins-history";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";

let checkInsRepository: CheckInsRepository;
let sut: GetUserCheckInsHistoryUseCase;

describe("GetUserCheckInsHistoryUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to list check-ins", async () => {
    checkInsRepository.create({
      user_id: "any_id",
      gym_id: "gym_id",
    });

    checkInsRepository.create({
      user_id: "any_id",
      gym_id: "gym_id2",
    });

    const { checkIns } = await sut.execute({ userId: "any_id", page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym_id" }),
      expect.objectContaining({ gym_id: "gym_id2" }),
    ]);
  });

  it("should be able to list paginated user check-ins", async () => {
    for (let i = 1; i <= 22; i++) {
      checkInsRepository.create({
        user_id: "any_id",
        gym_id: `gym_id${i}`,
      });
    }

    const { checkIns } = await sut.execute({ userId: "any_id", page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym_id21" }),
      expect.objectContaining({ gym_id: "gym_id22" }),
    ]);
  });
});
