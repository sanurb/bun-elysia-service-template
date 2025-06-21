import type { DomainEvent } from './domain_event';

export interface EventBus {
  publish<TEvent extends DomainEvent>(events: readonly TEvent[]): Promise<void>;
}
