import type { DomainEvent } from './domain_event';

export type DomainEventName<T extends DomainEvent> = Pick<T, 'eventName'>;
