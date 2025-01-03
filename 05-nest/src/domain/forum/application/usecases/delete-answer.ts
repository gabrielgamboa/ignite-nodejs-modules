import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return right(null);
  }
}
