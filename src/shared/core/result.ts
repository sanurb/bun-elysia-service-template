/**
 * Result<T> represents the outcome of an operation, encapsulating success or failure.
 * Use Result.ok(value) for success, Result.fail(error) for failure.
 */
export class Result<T> {
  readonly isSuccess: boolean;
  readonly isFailure: boolean;
  private readonly error?: string;
  private readonly _value?: T;

  constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }
    if (!(isSuccess || error)) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
    Object.freeze(this);
  }

  getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'getErrorValue' instead."
      );
    }
    // _value is always set for success
    return this._value as T;
  }

  getErrorValue(): string {
    if (this.isSuccess || !this.error) {
      throw new Error("Can't get the error value of a successful result.");
    }
    return this.error;
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  static combine<T>(results: readonly Result<T>[]): Result<T> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok<T>();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
