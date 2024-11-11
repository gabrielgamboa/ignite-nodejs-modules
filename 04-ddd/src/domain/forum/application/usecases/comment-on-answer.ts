import { Id } from "@/core/entities/id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

interface CommentOnAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

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

    if (!answer) throw new Error("Answer not found.");

    const answerComment = AnswerComment.create({
      authorId: new Id(authorId),
      answerId: new Id(answerId),
      content
    });

    await this.answersCommentsRepository.create(answerComment);

    return { answerComment };

  }
}
