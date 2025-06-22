import { describe, expect, it } from 'bun:test';
import { api } from '../api';

describe('API - /', () => {
  it('should return a 200 status with "Hello World"', async () => {
    // Arrange
    if (!api?.index?.get) {
      throw new Error('API route / is not defined');
    }

    // Act
    const { data, status } = await api.index.get();

    // Assert
    expect(status).toBe(200);
    expect(data).not.toBeNull();
    expect(data as unknown as string).toBe('Hello World');
  });
});
