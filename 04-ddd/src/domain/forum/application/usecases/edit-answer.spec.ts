import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { Id } from "@/core/entities/id";
import { EditAnswerUseCase } from "./edit-answer";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

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
    const response = await sut.execute({
      authorId: "1",
      answerId: "id",
      content: "Example content",
    });


    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
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

    const response = await sut.execute({
      authorId: "12",
      answerId: "answer-1",
      content: "Example content",
    });


    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});
