import { Id } from "@/core/entities/id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

interface CommentOnQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError());

    const questionComment = QuestionComment.create({
      authorId: new Id(authorId),
      questionId: new Id(questionId),
      content,
    });

    await this.questionsCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
