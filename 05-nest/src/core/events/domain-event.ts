import { Id } from "../entities/id";

// events must implement this interface to dispare events;
export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): Id;
}
