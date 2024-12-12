import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { Id } from "@/core/entities/id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseBestQuestionAnswerUseCase } from "./choose-best-question-answer";
import { makeQuestion } from "test/factories/make-question";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: ChooseBestQuestionAnswerUseCase;

describe("Choose Best Question Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new ChooseBestQuestionAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    );
  });

  it("should be able to choose best question answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id,
    );
  });

  it("should not be able to choose best question answer", async () => {
    const question = makeQuestion({ authorId: new Id("author-1") });
    const answer = makeAnswer({ questionId: question.id });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: "1",
      answerId: answer.id.toString(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
