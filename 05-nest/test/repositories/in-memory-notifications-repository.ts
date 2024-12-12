import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    return (
      this.items.find((item) => item.id.toString() === notificationId) ?? null
    );
  }

  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    );
    this.items[index] = notification;
  }
}
