import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { Id } from "@/core/entities/id";
import { EditQuestionUseCase } from "./edit-question";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository);
  });

  it("should be able to edit a question", async () => {
    const question = makeQuestion(
      {
        authorId: new Id("1"),
      },
      new Id("question-1"),
    );

    inMemoryQuestionsRepository.create(question);

    await sut.execute({
      authorId: "1",
      questionId: question.id.toString(),
      title: "Example title",
      content: "Example content",
      attachmentsIds: [],
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Example title",
      content: "Example content",
    });
  });

  it("should be able to edit a question with attachments", async () => {
    const question = makeQuestion(
      {
        authorId: new Id("1"),
      },
      new Id("question-1"),
    );

    inMemoryQuestionsRepository.create(question);

    makeQuestionAttachment({
      attachmentId: new Id('1'),
      questionId: question.id,
    })

    makeQuestionAttachment({
      attachmentId: new Id('2'),
      questionId: question.id,
    })

    await sut.execute({
      authorId: "1",
      questionId: question.id.toString(),
      title: "Example title",
      content: "Example content",
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Example title",
      content: "Example content",
    });

    console.log(inMemoryQuestionsRepository.items[0].attachments.currentItems)

    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new Id('1') }),
      expect.objectContaining({ attachmentId: new Id('3') }),
    ])
  });

  it("should not be able to delete a question if question does not exists", async () => {
    const response = await sut.execute({
      authorId: "1",
      questionId: "id",
      title: "Example title",
      content: "Example content",
      attachmentsIds: [],
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
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
      authorId: "12",
      questionId: "id",
      title: "Example title",
      content: "Example content",
      attachmentsIds: [],
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
