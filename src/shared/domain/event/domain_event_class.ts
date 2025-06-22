import type { DomainEvent } from './domain_event';

export type DomainEventClass<T extends DomainEvent = DomainEvent> = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  new (...args: any[]): T;
  eventName: string;
};
