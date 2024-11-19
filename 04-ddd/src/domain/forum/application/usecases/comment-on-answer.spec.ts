import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answers-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Commnet on Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswersCommentsRepository);
  });

  it("should be able to create a comment on answer", async () => {
    const answer = makeAnswer();
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: 'author-id-from-comment',
      content: 'Example content',
      answerId: answer.id.toString(),
    });

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(1);
    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual('Example content');
  });

  it("should not be able to comment on answer if answer does not exists", async () => {
    const result = await sut.execute({
      authorId: 'author-id-from-comment',
      content: 'Example content',
      answerId: 'any-id',
    });


    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
