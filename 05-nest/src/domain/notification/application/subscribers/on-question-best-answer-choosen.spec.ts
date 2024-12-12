import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import {
  CreateNotificationUseCase,
  CreateNotificationUseCaseRequest,
  CreateNotificationUseCaseResponse,
} from "../usecases/create-notification";
import { MockInstance } from "vitest";
import { makeQuestion } from "test/factories/make-question";
import { waitFor } from "test/utils/wait-for";
import { OnQuestionBestAnswerChoosen } from "./on-question-best-answer-choosen";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let createNotificationUseCase: CreateNotificationUseCase;

let createNotificationExecuteSpy: MockInstance<
  ({
    ...args
  }: CreateNotificationUseCaseRequest) => Promise<CreateNotificationUseCaseResponse>
>;

describe("On Question Best Answer Choosen Subscriber", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    createNotificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    createNotificationExecuteSpy = vi.spyOn(
      createNotificationUseCase,
      "execute",
    );
    new OnQuestionBestAnswerChoosen(
      inMemoryAnswersRepository,
      createNotificationUseCase,
    );
  });

  it("should be able to listener a question best answer choosen", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    question.bestAnswerId = answer.id;

    inMemoryQuestionsRepository.save(question);

    await waitFor(() => {
      expect(createNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
