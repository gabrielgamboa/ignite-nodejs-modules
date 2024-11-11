import { Id } from "@/core/entities/id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";

interface CommentOnQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionsCommentsRepository: QuestionsCommentsRepository,
  ) { }

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error("Question not found.");

    const questionComment = QuestionComment.create({
      authorId: new Id(authorId),
      questionId: new Id(questionId),
      content
    });

    await this.questionsCommentsRepository.create(questionComment);

    return { questionComment };

  }
}
