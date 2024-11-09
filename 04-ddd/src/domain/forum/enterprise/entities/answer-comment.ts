import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";
import { Optional } from "@/core/types/optional";

export interface AnswerCommentProps {
  authorId: Id;
  answerId: Id;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class AnswerComment extends Entity<AnswerCommentProps> {

  get authorId() {
    return this.props.authorId;
  }

  get answerId() {
    return this.props.answerId;
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  static create(props: Optional<AnswerCommentProps, "createdAt">, id?: Id) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return answerComment;
  }
}
