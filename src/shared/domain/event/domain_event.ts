export class DomainEvent {
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, occurredOn?: Date) {
    this.eventName = eventName;
    this.occurredOn = occurredOn ?? new Date();
  }
}
