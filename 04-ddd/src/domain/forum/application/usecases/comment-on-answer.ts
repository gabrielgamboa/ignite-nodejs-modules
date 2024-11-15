import { Id } from "@/core/entities/id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CommentOnAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
  answerComment: AnswerComment;
}>

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answersCommentsRepository: AnswersCommentsRepository,
  ) { }

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError())

    const answerComment = AnswerComment.create({
      authorId: new Id(authorId),
      answerId: new Id(answerId),
      content
    });

    await this.answersCommentsRepository.create(answerComment);

    return right({ answerComment })

  }
}
