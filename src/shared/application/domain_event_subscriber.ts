import type { DomainEvent } from '../domain/event/domain_event';
import type { DomainEventClass } from '../domain/event/domain_event_class';

export interface DomainEventSubscriber<T extends DomainEvent> {
  on(domainEvent: T): Promise<void>;

  subscribedTo(): DomainEventClass[];

  name(): string;
}
