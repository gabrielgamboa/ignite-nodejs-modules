import { Entity } from "../../core/entities/entity";
import { Id } from "../../core/entities/id";

interface AnswerProps {
  authorId: Id
  questionId: Id
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {

  get content() {
    return this.props.content;
  }

  constructor(props: AnswerProps, id?: string) {
    super(props, id); //can be ommited, because we are extending Entity and the constructor is already defined with the same parameters
  }
}