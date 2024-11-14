import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswersCommentsRepository) { }

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment = await this.answercommentsRepository.findById(answerCommentId);

    if (!answercomment) return left("Answer Comment not found");

    if (answercomment.authorId.toString() !== authorId) {
      return left("Not allowed.");
    }

    await this.answercommentsRepository.delete(answercomment);

    return right({});
  }
}
