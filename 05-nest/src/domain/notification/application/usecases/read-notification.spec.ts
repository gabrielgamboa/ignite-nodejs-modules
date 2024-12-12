import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { ReadNotificationUseCase } from "./read-notification";
import { makeNotification } from "test/factories/make-notification";
import { Id } from "@/core/entities/id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Create Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();
    inMemoryNotificationsRepository.create(notification);

    const response = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to read a notification if author does not match ", async () => {
    inMemoryNotificationsRepository.create(
      makeNotification(
        {
          recipientId: new Id("1"),
        },
        new Id("notification-1"),
      ),
    );

    const response = await sut.execute({
      recipientId: "2",
      notificationId: "notification-1",
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});
