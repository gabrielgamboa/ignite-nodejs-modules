import { Id } from "@/core/entities/id";
import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../entities/answer";

export class AnswerCreatedEvent implements DomainEvent {
  ocurredAt: Date;
  answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): Id {
    return this.answer.id;
  }
}