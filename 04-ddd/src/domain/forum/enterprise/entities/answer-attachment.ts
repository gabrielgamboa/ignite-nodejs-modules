import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";

interface AnswerAttachmentProps {
  answerId: Id;
  attachmentId: Id;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: AnswerAttachmentProps, id?: Id) {
    const answerAttachment = new AnswerAttachment(props, id);

    return answerAttachment;
  }
}