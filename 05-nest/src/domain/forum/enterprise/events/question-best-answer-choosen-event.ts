import { Id } from "@/core/entities/id";
import { DomainEvent } from "@/core/events/domain-event";
import { Question } from "../entities/question";

export class QuestionBestAnswerChoosenEvent implements DomainEvent {
  ocurredAt: Date;
  question: Question;
  bestAnswerId: Id;

  constructor(question: Question, bestAnswerId: Id) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): Id {
    return this.question.id;
  }
}
