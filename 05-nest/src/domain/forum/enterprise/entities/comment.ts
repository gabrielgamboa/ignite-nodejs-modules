import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";

export interface CommentProps {
  authorId: Id;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class Comment<T extends CommentProps> extends Entity<T> {
  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get content() {
    return this.props.content;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
}
