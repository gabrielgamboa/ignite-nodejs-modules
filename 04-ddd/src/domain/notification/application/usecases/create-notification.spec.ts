import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { CreateNotificationUseCase } from "./create-notification"

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: CreateNotificationUseCase;

describe('Create Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new CreateNotificationUseCase(inMemoryNotificationsRepository);
  })

  it('should be able to create a new notification', async () => {
    const response = await sut.execute({
      title: 'Nova notificação',
      content: 'Uma nova notificação surgiu',
      recipientId: 'recipient-id-1'
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value?.notification.title).toBe('Nova notificação');
    expect(inMemoryNotificationsRepository.items[0]).toEqual(response.value?.notification);
  })
})