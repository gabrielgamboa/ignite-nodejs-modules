import { InMemoryAnswersRepository } from "test/repositories/answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { Id } from "@/core/entities/id";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    inMemoryAnswersRepository.create(
      makeAnswer(
        {
          authorId: new Id("1"),
        },
        new Id("answer-1"),
      ),
    );

    await sut.execute({
      authorId: "1",
      answerId: "answer-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer if answer does not exists", async () => {
    expect(async () => {
      await sut.execute({
        authorId: "1",
        answerId: "answer-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to delete a answer if author does not match ", async () => {
    inMemoryAnswersRepository.create(
      makeAnswer(
        {
          authorId: new Id("1"),
        },
        new Id("answer-1"),
      ),
    );

    expect(async () => {
      await sut.execute({
        authorId: "2",
        answerId: "answer-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
