import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { Id } from "@/core/entities/id";
import { EditAnswerUseCase } from "./edit-answer";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    );
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
      attachmentsIds: [],
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
      attachmentsIds: [],
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
      attachmentsIds: [],
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });

  it("should be able to edit a answer with attachments", async () => {
    const answer = makeAnswer(
      {
        authorId: new Id("1"),
      },
      new Id("answer-1"),
    );

    inMemoryAnswersRepository.create(answer);

    makeAnswerAttachment({
      attachmentId: new Id("1"),
      answerId: answer.id,
    });

    makeAnswerAttachment({
      attachmentId: new Id("2"),
      answerId: answer.id,
    });

    await sut.execute({
      authorId: "1",
      answerId: answer.id.toString(),
      content: "Example content",
      attachmentsIds: ["1", "3"],
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Example content",
    });

    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new Id("1") }),
        expect.objectContaining({ attachmentId: new Id("3") }),
      ],
    );
  });
});
