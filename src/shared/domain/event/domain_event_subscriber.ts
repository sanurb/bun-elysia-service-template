import type { DomainEvent } from './domain_event';
import type { DomainEventName } from './domain_event_name';

export interface DomainEventSubscriber<TEvent extends DomainEvent> {
  on(domainEvent: TEvent): Promise<void>;

  subscribedTo(): readonly DomainEventName<TEvent>[];
}
