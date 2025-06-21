import { Result } from './result';

export type GuardResponse = string;

export interface GuardArgument<T> {
  argument: T;
  argumentName: string;
}

export type GuardArgumentCollection<T> = readonly GuardArgument<T>[];

export function combine<T>(guardResults: readonly Result<T>[]): Result<T> {
  for (const result of guardResults) {
    if (result.isFailure) {
      return result;
    }
  }
  return Result.ok<T>();
}

export function greaterThan(
  minValue: number,
  actualValue: number
): Result<GuardResponse> {
  return actualValue > minValue
    ? Result.ok<GuardResponse>()
    : Result.fail<GuardResponse>(
        `Number given {${actualValue}} is not greater than {${minValue}}`
      );
}

export function againstAtLeast(
  numChars: number,
  text: string
): Result<GuardResponse> {
  return text.length >= numChars
    ? Result.ok<GuardResponse>()
    : Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`);
}

export function againstAtMost(
  numChars: number,
  text: string
): Result<GuardResponse> {
  return text.length <= numChars
    ? Result.ok<GuardResponse>()
    : Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`);
}

export function againstNullOrUndefined<T>(
  argument: T,
  argumentName: string
): Result<GuardResponse> {
  if (argument === null || argument === undefined) {
    return Result.fail<GuardResponse>(`${argumentName} is null or undefined`);
  }
  return Result.ok<GuardResponse>();
}

export function againstNullOrUndefinedBulk<T>(
  args: GuardArgumentCollection<T>
): Result<GuardResponse> {
  for (const arg of args) {
    const result = againstNullOrUndefined(arg.argument, arg.argumentName);
    if (result.isFailure) {
      return result;
    }
  }
  return Result.ok<GuardResponse>();
}

export function isOneOf<T>(
  value: T,
  validValues: readonly T[],
  argumentName: string
): Result<GuardResponse> {
  const isValid = validValues.includes(value);
  if (isValid) {
    return Result.ok<GuardResponse>();
  }
  return Result.fail<GuardResponse>(
    `${argumentName} isn't oneOf the correct values in ${JSON.stringify(validValues)}. Got "${value}".`
  );
}

export function inRange(
  num: number,
  min: number,
  max: number,
  argumentName: string
): Result<GuardResponse> {
  const isInRange = num >= min && num <= max;
  if (!isInRange) {
    return Result.fail<GuardResponse>(
      `${argumentName} is not within range ${min} to ${max}.`
    );
  }
  return Result.ok<GuardResponse>();
}

export function allInRange(
  numbers: readonly number[],
  min: number,
  max: number,
  argumentName: string
): Result<GuardResponse> {
  for (const num of numbers) {
    const numIsInRangeResult = inRange(num, min, max, argumentName);
    if (numIsInRangeResult.isFailure) {
      return Result.fail<GuardResponse>(
        `${argumentName} is not within the range.`
      );
    }
  }
  return Result.ok<GuardResponse>();
}
