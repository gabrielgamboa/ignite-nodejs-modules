import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public items: AnswerComment[] = [];

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find(item => item.id.toString() === id) ?? null;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex(item => item.id.toString() === answerComment.id.toString());

    this.items.splice(index, 1);
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams): Promise<AnswerComment[]> {
    return this.items
      .filter(item => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);
  }

  async create(AnswerComment: AnswerComment): Promise<void> {
    this.items.push(AnswerComment)
  }


}