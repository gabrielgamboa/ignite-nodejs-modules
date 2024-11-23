import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { Id } from "@/core/entities/id";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: QuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionsAttachmentsRepository);
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const response = await sut.execute({
      title: "Nova Pergunta",
      content: "Nova Resposta",
      authorId: "1",
      attachmentsIds: [],
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value?.question.id).toBeTruthy();
    expect(response.value?.question.slug.value).toEqual("nova-pergunta");
  });

  it("should be able to create a question with attachments", async () => {
    const response = await sut.execute({
      title: "Nova Pergunta",
      content: "Nova Resposta",
      authorId: "1",
      attachmentsIds: ['1', '2'],
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value?.question.id).toBeTruthy();
    expect(response.value?.question.attachments.currentItems).toHaveLength(2)
    expect(response.value?.question.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new Id('1') }),
      expect.objectContaining({ attachmentId: new Id('2') }),
    ])
  });
});
