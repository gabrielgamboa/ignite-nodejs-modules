import { Id } from "@/core/entities/id";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export const makeAnswerAttachment = (override: Partial<AnswerAttachment> = {}, id?: Id): AnswerAttachment => {
  return AnswerAttachment.create({
    attachmentId: new Id(),
    answerId: new Id(),
    ...override,
  }, id);
}