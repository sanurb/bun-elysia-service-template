import type { UniqueEntityID } from './unique_entity_id';
import { UniqueEntityID as UniqueEntityIDImpl } from './unique_entity_id';

function isEntity(v: object): v is Entity<object> {
  return v instanceof Entity;
}

/**
 * Abstract base for domain entities with unique identity and immutable properties.
 * @template T - The shape of the entity's properties.
 */
export abstract class Entity<T extends object> {
  protected readonly _id: UniqueEntityID;
  readonly props: Readonly<T>;

  constructor(props: T, id?: UniqueEntityID) {
    if (props === null || props === undefined) {
      throw new Error('Entity props must not be null or undefined.');
    }
    this._id = id ?? new UniqueEntityIDImpl();
    this.props = Object.freeze({ ...props });
  }

  /**
   * Checks if this entity is equal to another entity by identity.
   * @param object The entity to compare with.
   * @returns True if the entities have the same identity, false otherwise.
   */
  equals(object?: Entity<T>): boolean {
    if (object === undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!(object && isEntity(object))) {
      return false;
    }
    return this._id.equals(object._id);
  }
}
