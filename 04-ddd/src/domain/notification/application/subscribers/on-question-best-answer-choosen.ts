import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";
import { CreateNotificationUseCase } from "../usecases/create-notification";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerChoosenEvent } from "@/domain/forum/enterprise/events/question-best-answer-choosen-event";

export class OnQuestionBestAnswerChoosen implements EventHandler {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly createNotificationUseCase: CreateNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), QuestionBestAnswerChoosenEvent.name)
  }

  private async sendQuestionBestAnswerNotification({ bestAnswerId, question }: QuestionBestAnswerChoosenEvent) {
    const answer = await this.answersRepository.findById(bestAnswerId.toString());

    if (answer) {
      await this.createNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua resposta foi escolhida!',
        content: `A resposta que você enviou em ${question.title.substring(0, 20).concat('...')} foi escolhida pelo autor.`
      })
    }
  }
}