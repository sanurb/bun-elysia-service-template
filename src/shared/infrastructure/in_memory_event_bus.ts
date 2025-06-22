import type { DomainEvent } from '../domain/event/domain_event';
import type { DomainEventSubscriber } from '../domain/event/domain_event_subscriber';
import type { EventBus } from '../domain/event/event_bus';

type SubscriberCallback = (event: DomainEvent) => Promise<void>;

/**
 * An in-memory implementation of the EventBus.
 * It allows for subscribing to domain events and publishing them synchronously.
 * Failed subscriptions are logged to the console.
 */
export class InMemoryEventBus implements EventBus {
  private readonly subscriptions: Map<string, SubscriberCallback[]> = new Map();

  constructor(subscribers: readonly DomainEventSubscriber<DomainEvent>[]) {
    this.registerSubscribers(subscribers);
  }

  async publish<TEvent extends DomainEvent>(
    events: readonly TEvent[]
  ): Promise<void> {
    const executions: Promise<void>[] = [];

    for (const event of events) {
      const subscribers = this.subscriptions.get(event.eventName);

      if (subscribers) {
        for (const subscriber of subscribers) {
          executions.push(subscriber(event));
        }
      }
    }

    await Promise.all(executions).catch((error) => {
      console.error('Error executing subscriptions:', error);
    });
  }

  private registerSubscribers(
    subscribers: readonly DomainEventSubscriber<DomainEvent>[]
  ): void {
    for (const subscriber of subscribers) {
      for (const event of subscriber.subscribedTo()) {
        this.subscribe(event.eventName, subscriber);
      }
    }
  }

  private subscribe(
    topic: string,
    subscriber: DomainEventSubscriber<DomainEvent>
  ): void {
    const currentSubscriptions = this.subscriptions.get(topic);
    const subscription = subscriber.on.bind(subscriber);

    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(topic, [subscription]);
    }
  }
}
