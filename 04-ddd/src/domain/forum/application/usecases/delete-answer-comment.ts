import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse { }
export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswersCommentsRepository) { }

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment = await this.answercommentsRepository.findById(answerCommentId);

    if (!answercomment) throw new Error("Answer Comment not found");

    if (answercomment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.answercommentsRepository.delete(answercomment);

    return {};
  }
}
