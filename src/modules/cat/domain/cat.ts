import { AggregateRoot } from '../../../shared/domain/aggregate_root';
import { Entity } from '../../../shared/domain/entity';
import type { CatId } from './cat_id';

interface CatProps {
  name: string;
  age: number;
  breed: string;
}

export class Cat extends Entity<CatProps> {
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
}

export class CatAggregate extends AggregateRoot {}
