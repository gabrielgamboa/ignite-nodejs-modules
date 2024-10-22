import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { Id } from "../../core/entities/id";


interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
  bestAnswerId: Id;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: QuestionProps, id?: Id) {
    const question = new Question(props, id);
    return question;
  }
}