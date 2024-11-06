import { InMemoryAnswersRepository } from "test/repositories/answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { Id } from "@/core/entities/id";
import { EditAnswerUseCase } from "./edit-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const answer = makeAnswer(
      {
        authorId: new Id("1"),
      },
      new Id("answer-1"),
    );

    inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: "1",
      answerId: answer.id.toString(),
      content: "Example content",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Example content",
    });
  });

  it("should not be able to delete a answer if answer does not exists", async () => {
    expect(async () => {
      await sut.execute({
        authorId: "1",
        answerId: "id",
        content: "Example content",
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
        authorId: "12",
        answerId: "id",
        content: "Example content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
