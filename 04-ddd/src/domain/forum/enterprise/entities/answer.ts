import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";
import { Optional } from "@/core/types/optional";
import { AnswerAttachmentList } from "./answer-attachment-list";

export interface AnswerProps {
  authorId: Id;
  questionId: Id;
  content: string;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat("...");
  }

  get attachments() {
    return this.props.attachments;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  protected constructor(props: AnswerProps, id?: Id) {
    super(props, id); // can be ommited, because we are extending Entity and the constructor is already defined with the same parameters
  }

  static create(props: Optional<AnswerProps, "createdAt" | "attachments">, id?: Id) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    );

    return answer;
  }
}
