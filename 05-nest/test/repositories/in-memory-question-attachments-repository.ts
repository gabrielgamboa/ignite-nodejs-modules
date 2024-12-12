import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    return (
      this.items.filter(
        (questionAttachment) =>
          questionAttachment.questionId.toString() === questionId,
      ) ?? []
    );
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    this.items = this.items.filter(
      (questionAttachment) =>
        questionAttachment.questionId.toString() !== questionId,
    );
  }
}
