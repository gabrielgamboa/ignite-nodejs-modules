import { InMemoryQuestionsRepository } from "test/repositories/questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsCommentsRepository } from "test/repositories/questions-comments-repository";
import { makeQuestion } from "test/factories/make-question";
import { Id } from "@/core/entities/id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question", () => {
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
    expect(async () => await sut.execute({
      authorId: 'author-id-from-comment',
      content: 'Example content',
      questionId: 'any-id',
    })).rejects.toThrowError()
  });
});
