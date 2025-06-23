import { Result } from '../../../shared/core/result';
import { AggregateRoot } from '../../../shared/domain/aggregate_root';
import { Entity } from '../../../shared/domain/entity';
import type { DomainEvent } from '../../../shared/domain/event/domain_event';
import type { UniqueEntityID } from '../../../shared/domain/unique_entity_id';
import type { CatId } from './cat_id';

class CatAggregate extends AggregateRoot {}

interface CatProps {
  name: string;
  age: number;
  breed: string;
}

export class Cat extends Entity<CatProps> {
  private readonly aggregate: CatAggregate = new CatAggregate();

  get id(): CatId {
    return this._id as CatId;
  }

  get name(): string {
    return this.props.name;
  }

  get age(): number {
    return this.props.age;
  }

  get breed(): string {
    return this.props.breed;
  }

  pullDomainEvents(): DomainEvent[] {
    return this.aggregate.pullDomainEvents();
  }

  record(event: DomainEvent): void {
    this.aggregate.record(event);
  }

  private constructor(props: CatProps, id?: UniqueEntityID) {
    super(props, id);
  }

  update(props: Partial<CatProps>): Result<Cat> {
    const newProps = {
      ...this.props,
      ...props,
    };
    return Cat.create(newProps, this._id);
  }

  static create(props: CatProps, id?: UniqueEntityID): Result<Cat> {
    if (props.name.length < 2) {
      return Result.fail<Cat>('Cat name must be at least 2 characters.');
    }

    if (props.age < 0) {
      return Result.fail<Cat>('Cat age cannot be negative.');
    }

    return Result.ok<Cat>(new Cat(props, id));
  }
}
