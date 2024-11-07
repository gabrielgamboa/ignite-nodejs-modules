import { InMemoryAnswersRepository } from "test/repositories/answers-repository";
import { Id } from "@/core/entities/id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/questions-repository";
import { ChooseBestQuestionAnswerUseCase } from "./choose-best-question-answer";
import { makeQuestion } from "test/factories/make-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseBestQuestionAnswerUseCase;

describe("Choose Best Question Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
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

    expect(async () => {
      await sut.execute({
        authorId: "1",
        answerId: "answer-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
