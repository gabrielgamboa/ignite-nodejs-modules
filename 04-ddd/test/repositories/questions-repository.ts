import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((item) => item.slug.value === slug) ?? null;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    this.items.splice(index, 1);
  }

  async save(question: Question): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    this.items[index] = question;
  }
}
