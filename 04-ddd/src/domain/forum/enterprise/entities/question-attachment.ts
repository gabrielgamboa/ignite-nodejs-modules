import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";

interface QuestionAttachmentProps {
  questionId: Id;
  attachmentId: Id;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: QuestionAttachmentProps, id?: Id) {
    const questionAttachment = new QuestionAttachment(props, id);

    return questionAttachment;
  }
}