import { Id } from "@/core/entities/id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export interface QuestionCommentProps extends CommentProps {
  questionId: Id;
}

export class QuestionComment extends Comment<QuestionCommentProps> {

  get questionId() {
    return this.props.questionId;
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
