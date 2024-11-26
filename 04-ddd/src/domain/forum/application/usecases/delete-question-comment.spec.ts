import { makeQuestionComment } from "test/factories/make-question-comment";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { InMemoryQuestionsCommentsRepository } from "test/repositories/in-memory-questions-comments-repository";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsCommentsRepository);
  });

  it("should be able to delete a question comment question", async () => {
    const questionComment = makeQuestionComment();

    inMemoryQuestionsCommentsRepository.create(questionComment);

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionsCommentsRepository.create(questionComment)

    const response = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })

});
