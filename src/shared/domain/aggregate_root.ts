import type { DomainEvent } from './event/domain_event';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
}
