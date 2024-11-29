import { AggregateRoot } from "../entities/aggregate-root";
import { Id } from "../entities/id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateEvent implements DomainEvent {
  public ocurredAt: Date;
  public customAggregate: CustomAggregate;

  constructor(customAggregate: CustomAggregate) {
    this.customAggregate = customAggregate;
    this.ocurredAt = new Date();
  }

  getAggregateId(): Id {
    return this.customAggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateEvent(aggregate));

    return aggregate;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callBackSpy = vi.fn();


    //registra um subscriber(ouvindo o evento "resposta criada")
    DomainEvents.register(callBackSpy, CustomAggregateEvent.name);

    //criando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create();

    //assegurando que o evento foi criado, mas não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // o subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callBackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);

  })
})


