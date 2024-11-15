import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}


type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>
export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswersCommentsRepository) { }

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment = await this.answercommentsRepository.findById(answerCommentId);

    if (!answercomment) return left(new ResourceNotFoundError());

    if (answercomment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answercommentsRepository.delete(answercomment);

    return right({});
  }
}
