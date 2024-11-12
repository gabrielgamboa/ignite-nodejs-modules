import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse { }
export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentsRepository: QuestionsCommentsRepository) { }

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment = await this.questioncommentsRepository.findById(questionCommentId);

    if (!questioncomment) throw new Error("Question Comment not found");

    if (questioncomment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.questioncommentsRepository.delete(questioncomment);

    return {};
  }
}
