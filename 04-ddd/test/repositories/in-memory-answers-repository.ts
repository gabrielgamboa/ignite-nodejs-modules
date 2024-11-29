import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) { }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async findById(id: string): Promise<Answer | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    return this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);
  }

  async save(answer: Answer): Promise<void> {
    const index = await this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    this.items[index] = answer;
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    this.items.splice(index, 1);

    await this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }
}
