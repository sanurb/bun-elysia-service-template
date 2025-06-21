export interface IUseCaseError {
  readonly message: string;
}

/**
 * Base class for use case errors. Extend this for specific error types.
 */
export abstract class UseCaseError implements IUseCaseError {
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
