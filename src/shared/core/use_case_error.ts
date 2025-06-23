export interface IUseCaseError {
  readonly message: string;
}

/**
 * Base class for use case errors. Extend this for specific error types.
 */
export abstract class UseCaseError extends Error implements IUseCaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
