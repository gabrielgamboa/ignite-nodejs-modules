import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { Id } from "../../core/entities/id";
import { Optional } from "../../core/types/optional";
import dayjs from "dayjs";


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

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get slug() {
    return this.props.slug;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content
      .substring(0, 120)
      .trimEnd()
      .concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.content = content;
    this.touch();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set bestAnswerId(bestAnswerId: Id) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  get isNew() {
    return dayjs().diff(this.createdAt, 'days') <= 3;
  }


  static create(props: Optional<QuestionProps, 'createdAt' |  'slug'>, id?: Id) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: new Date(),
    }, id);
    return question;
  }
}