import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { Id } from "@/core/entities/id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion(
        {
          authorId: new Id("1"),
        },
        new Id("question-1"),
      ),
    );

    await sut.execute({
      authorId: "1",
      questionId: "question-1",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question if question does not exists", async () => {
    const response = await sut.execute({
      authorId: "1",
      questionId: "question-1",
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  });

  it("should not be able to delete a question if author does not match ", async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion(
        {
          authorId: new Id("1"),
        },
        new Id("question-1"),
      ),
    );

    const response = await sut.execute({
      authorId: "2",
      questionId: "question-1",
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError)
  });
});
