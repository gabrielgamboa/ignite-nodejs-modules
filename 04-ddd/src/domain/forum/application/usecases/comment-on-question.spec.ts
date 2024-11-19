import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsCommentsRepository } from "test/repositories/in-memory-questions-comments-repository";
import { makeQuestion } from "test/factories/make-question";
import { Id } from "@/core/entities/id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository();
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository);
  });

  it("should be able to create a comment on question", async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      authorId: 'author-id-from-comment',
      content: 'Example content',
      questionId: question.id.toString(),
    });

    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(1);
    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual('Example content');
  });

  it("should not be able to comment on question if question does not exists", async () => {
    const response = await sut.execute({
      authorId: 'author-id-from-comment',
      content: 'Example content',
      questionId: 'any-id',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  });
});
