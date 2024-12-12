import { Id } from "@/core/entities/id";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("create an answer", async () => {
    const response = await sut.execute({
      content: "Nova Resposta",
      questionId: "1",
      instructorId: "1",
      attachmentsIds: [],
    });

    expect(response.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(response.value?.answer);
  });

  it("should be able to create a answer with attachments", async () => {
    const response = await sut.execute({
      content: "Nova Resposta",
      questionId: "1",
      instructorId: "1",
      attachmentsIds: ["1", "2"],
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value?.answer.id).toBeTruthy();
    expect(response.value?.answer.attachments.currentItems).toHaveLength(2);
    expect(response.value?.answer.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new Id("1") }),
      expect.objectContaining({ attachmentId: new Id("2") }),
    ]);
  });
});
