import { Id } from "@/core/entities/id";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export const makeQuestionAttachment = (
  override: Partial<QuestionAttachment> = {},
  id?: Id,
): QuestionAttachment => {
  return QuestionAttachment.create(
    {
      attachmentId: new Id(),
      questionId: new Id(),
      ...override,
    },
    id,
  );
};
