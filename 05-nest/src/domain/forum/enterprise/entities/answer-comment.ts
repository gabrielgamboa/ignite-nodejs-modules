import { Id } from "@/core/entities/id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export interface AnswerCommentProps extends CommentProps {
  answerId: Id;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
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
