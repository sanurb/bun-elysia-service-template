import { describe, expect, test } from 'bun:test';
import {
  type GuardArgument,
  againstAtLeast,
  againstAtMost,
  againstNullOrUndefined,
  againstNullOrUndefinedBulk,
  allInRange,
  combine,
  greaterThan,
  inRange,
  isOneOf,
} from './guard';
import { Result } from './result';

describe('combine', () => {
  test('returns first failure', () => {
    // Arrange
    const fail = Result.fail<string>('fail');
    const ok = Result.ok<string>('ok');
    // Act
    const result = combine([ok, fail, ok]);
    // Assert
    expect(result).toBe(fail);
  });

  test('returns ok if all succeed', () => {
    // Arrange
    const ok1 = Result.ok<string>('ok1');
    const ok2 = Result.ok<string>('ok2');
    // Act
    const result = combine([ok1, ok2]);
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns ok for empty array', () => {
    // Act
    const result = combine([]);
    // Assert
    expect(result.isSuccess).toBe(true);
  });
});

describe('greaterThan', () => {
  test('returns ok if actualValue > minValue', () => {
    // Act
    const result = greaterThan(1, 2);
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail if actualValue <= minValue', () => {
    // Act & Assert
    expect(greaterThan(2, 2).isFailure).toBe(true);
    expect(greaterThan(3, 2).isFailure).toBe(true);
  });
});

describe('againstAtLeast', () => {
  test('returns ok if text is long enough', () => {
    // Act
    const result = againstAtLeast(3, 'abcd');
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail if text is too short', () => {
    // Act
    const result = againstAtLeast(5, 'abc');
    // Assert
    expect(result.isFailure).toBe(true);
  });

  test('returns ok for exact length', () => {
    // Act
    const result = againstAtLeast(3, 'abc');
    // Assert
    expect(result.isSuccess).toBe(true);
  });
});

describe('againstAtMost', () => {
  test('returns ok if text is short enough', () => {
    // Act
    const result = againstAtMost(3, 'abc');
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail if text is too long', () => {
    // Act
    const result = againstAtMost(2, 'abc');
    // Assert
    expect(result.isFailure).toBe(true);
  });

  test('returns ok for exact length', () => {
    // Act
    const result = againstAtMost(3, 'abc');
    // Assert
    expect(result.isSuccess).toBe(true);
  });
});

describe('againstNullOrUndefined', () => {
  test('returns ok for defined', () => {
    // Act
    const result = againstNullOrUndefined('value', 'arg');
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail for null or undefined', () => {
    // Act & Assert
    expect(againstNullOrUndefined(null, 'arg').isFailure).toBe(true);
    expect(againstNullOrUndefined(undefined, 'arg').isFailure).toBe(true);
  });

  test('returns ok for 0, false, empty string', () => {
    expect(againstNullOrUndefined(0, 'zero').isSuccess).toBe(true);
    expect(againstNullOrUndefined(false, 'bool').isSuccess).toBe(true);
    expect(againstNullOrUndefined('', 'empty').isSuccess).toBe(true);
  });
});

describe('againstNullOrUndefinedBulk', () => {
  test('returns ok if all defined', () => {
    // Arrange
    const args: GuardArgument<string>[] = [
      { argument: 'a', argumentName: 'a' },
      { argument: 'b', argumentName: 'b' },
    ];
    // Act
    const result = againstNullOrUndefinedBulk(args);
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail if any undefined', () => {
    // Arrange
    const args: GuardArgument<string | undefined>[] = [
      { argument: 'a', argumentName: 'a' },
      { argument: undefined, argumentName: 'b' },
    ];
    // Act
    const result = againstNullOrUndefinedBulk(args);
    // Assert
    expect(result.isFailure).toBe(true);
  });

  test('returns ok for empty array', () => {
    // Act
    const result = againstNullOrUndefinedBulk([]);
    // Assert
    expect(result.isSuccess).toBe(true);
  });
});

describe('isOneOf', () => {
  const table = [
    { value: 'a', valid: ['a', 'b'], expected: true },
    { value: 'c', valid: ['a', 'b'], expected: false },
    { value: 1, valid: [1, 2, 3], expected: true },
    { value: 4, valid: [1, 2, 3], expected: false },
    { value: null, valid: [null, undefined], expected: true },
    { value: undefined, valid: [null, undefined], expected: true },
  ];
  for (const { value, valid, expected } of table) {
    test(`returns ${expected ? 'ok' : 'fail'} for value=${String(value)} in validValues=${JSON.stringify(valid)}`, () => {
      // Act
      const result = isOneOf(value, valid, 'arg');
      // Assert
      expect(result.isSuccess).toBe(expected);
    });
  }
});

describe('inRange', () => {
  const table = [
    { num: 5, min: 1, max: 10, expected: true },
    { num: 1, min: 1, max: 10, expected: true },
    { num: 10, min: 1, max: 10, expected: true },
    { num: 0, min: 1, max: 10, expected: false },
    { num: 11, min: 1, max: 10, expected: false },
  ];
  for (const { num, min, max, expected } of table) {
    test(`returns ${expected ? 'ok' : 'fail'} for num=${num} in [${min},${max}]`, () => {
      // Act
      const result = inRange(num, min, max, 'num');
      // Assert
      expect(result.isSuccess).toBe(expected);
    });
  }
});

describe('allInRange', () => {
  test('returns ok if all numbers are in range', () => {
    // Act
    const result = allInRange([2, 3, 4], 1, 5, 'nums');
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail if any number is out of range', () => {
    // Act
    const result = allInRange([2, 6, 4], 1, 5, 'nums');
    // Assert
    expect(result.isFailure).toBe(true);
  });

  test('returns ok for empty array', () => {
    // Act
    const result = allInRange([], 1, 5, 'nums');
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns ok for single value in range', () => {
    // Act
    const result = allInRange([3], 1, 5, 'nums');
    // Assert
    expect(result.isSuccess).toBe(true);
  });

  test('returns fail for single value out of range', () => {
    // Act
    const result = allInRange([10], 1, 5, 'nums');
    // Assert
    expect(result.isFailure).toBe(true);
  });
});
