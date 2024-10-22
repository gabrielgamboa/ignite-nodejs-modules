import { Entity } from "../../core/entities/entity";
import { Id } from "../../core/entities/id";
import { Optional } from "../../core/types/optiona";

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

  protected constructor(props: AnswerProps, id?: Id) {
    super(props, id); //can be ommited, because we are extending Entity and the constructor is already defined with the same parameters
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: Id) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id);

    
    return answer;
  }
}