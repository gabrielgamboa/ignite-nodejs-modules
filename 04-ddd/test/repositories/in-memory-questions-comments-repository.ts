import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/questions-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex(item => item.id.toString() === questionComment.id.toString());

    this.items.splice(index, 1);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<QuestionComment[]> {
    return this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find(item => item.id.toString() === id) ?? null;
  }
}