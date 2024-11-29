import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { Id } from "@/core/entities/id";
import { makeAnswer } from "test/factories/make-answer";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const answer = makeAnswer(
      {
        authorId: new Id("1"),
      },
      new Id("answer-1"),
    );

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({ answerId: answer.id, attachmentId: new Id('1') }),
      makeAnswerAttachment({ answerId: answer.id, attachmentId: new Id('2') }),
    )

    inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: "1",
      answerId: "answer-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer if answer does not exists", async () => {
    const response = await sut.execute({
      authorId: "1",
      answerId: "answer-1",
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
      authorId: "2",
      answerId: "answer-1",
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});
