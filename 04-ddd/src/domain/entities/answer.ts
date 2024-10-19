import { randomUUID } from "crypto";
import { Entity } from "../../core/entities/entity";

interface AnswerProps {
  authorId: string
  questionId: string
  content: string
 }

export class Answer extends Entity<AnswerProps> {

  get content() {
    return this.props.content;
  }

  constructor(props: AnswerProps, id?: string) {
    super(props, id); //can be ommited, because we are extending Entity and the constructor is already defined with the same parameters
  }
}