import { faker } from '@faker-js/faker'
import { Id } from '@/core/entities/id'
import { Notification, NotificationProps } from '@/domain/notification/enterprise/entities/notification'

export const makeNotification = (override: Partial<NotificationProps> = {}, id?: Id) => {
  return Notification.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
      recipientId: new Id(),
      ...override,
    },
    id,
  )
}
