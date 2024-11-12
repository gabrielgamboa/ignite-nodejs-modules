import { makeAnswerComment } from "test/factories/make-answer-comment";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answers-comments-repository";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersCommentsRepository);
  });

  it("should be able to delete a answer comment answer", async () => {
    const answerComment = makeAnswerComment();

    inMemoryAnswersCommentsRepository.create(answerComment);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswersCommentsRepository.create(answerComment)

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })

});
