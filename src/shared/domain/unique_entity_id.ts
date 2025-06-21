import { createId } from '@paralleldrive/cuid2';
import { Identifier } from './identifier';

/**
 * UniqueEntityID provides a unique, immutable identifier for entities.
 */
export class UniqueEntityID extends Identifier<string> {
  /**
   * Creates a UniqueEntityID instance.
   * @param id Optional string ID. If not provided, a new one is generated.
   * @throws {Error} If the provided ID is invalid.
   */
  constructor(id?: string) {
    if (id !== undefined && !UniqueEntityID.isValid(id)) {
      throw new Error('Invalid UniqueEntityID: must be a non-empty string.');
    }
    super(id ?? createId());
  }

  /**
   * Validates the ID format.
   * @param id The ID to validate.
   * @returns True if valid, false otherwise.
   */
  static isValid(id: string): boolean {
    return typeof id === 'string' && id.length > 0;
  }
}
