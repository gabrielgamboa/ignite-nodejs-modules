import { Either, right } from "@/core/either";
import { Id } from "@/core/entities/id";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface CreateNotificationUseCaseRequest {
  title: string;
  content: string;
  recipientId: string;
}

export type CreateNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class CreateNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    title,
    content,
    recipientId,
  }: CreateNotificationUseCaseRequest): Promise<CreateNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new Id(recipientId),
      content,
      title,
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}
