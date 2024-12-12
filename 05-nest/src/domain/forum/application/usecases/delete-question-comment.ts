import { Either, left, right } from "@/core/either";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questioncommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment =
      await this.questioncommentsRepository.findById(questionCommentId);

    if (!questioncomment) return left(new ResourceNotFoundError());

    if (questioncomment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questioncommentsRepository.delete(questioncomment);

    return right(null);
  }
}
