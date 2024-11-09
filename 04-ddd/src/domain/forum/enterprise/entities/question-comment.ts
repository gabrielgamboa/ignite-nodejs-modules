import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";
import { Optional } from "@/core/types/optional";

export interface QuestionCommentProps {
  authorId: Id;
  questionId: Id;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionComment extends Entity<QuestionCommentProps> {

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
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

  static create(props: Optional<QuestionCommentProps, "createdAt">, id?: Id) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return questionComment;
  }
}
