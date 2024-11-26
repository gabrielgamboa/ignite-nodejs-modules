import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";
import { Optional } from "@/core/types/optional";

export interface NotificationProps {
  recipientId: Id;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
}


export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  public readNotification() {
    this.props.readAt = new Date();
  }

  static create(props: Optional<NotificationProps, 'createdAt'>, id?: Id) {
    return new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)
  }
}