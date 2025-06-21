/**
 * Identifier<T> is a base class for value objects representing unique identifiers.
 */
export class Identifier<T> {
  /**
   * The underlying value of the identifier (immutable).
   */
  private readonly value: T;

  /**
   * Constructs an Identifier instance.
   * @param value The identifier value. Must not be null or undefined.
   * @throws {Error} If value is null or undefined.
   */
  constructor(value: T) {
    if (value === null || value === undefined) {
      throw new Error('Identifier value must not be null or undefined.');
    }
    this.value = value;
  }

  /**
   * Checks equality with another Identifier.
   * @param id The Identifier to compare with.
   * @returns True if equal, false otherwise.
   */
  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  /**
   * Returns the string representation of the identifier value.
   */
  toString(): string {
    return String(this.value);
  }

  /**
   * Returns the raw value of the identifier.
   */
  toValue(): T {
    return this.value;
  }
}
