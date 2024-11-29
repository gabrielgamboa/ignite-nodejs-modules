import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { Id } from "@/core/entities/id";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch question answers", async () => {
    const questionId = "1";

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new Id(questionId) }),
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new Id(questionId) }),
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new Id(questionId) }),
    );

    const result = await sut.execute({ page: 1, questionId });

    expect(result.value?.answers).toHaveLength(3);
  });

  it("should be able to fetch paginated question answers", async () => {
    const questionId = "1";
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new Id(questionId) }),
      );
    }

    const result = await sut.execute({ page: 2, questionId });
    expect(result.value?.answers).toHaveLength(2);
  });
});
