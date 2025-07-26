import { createPinoLogger } from '@bogeychan/elysia-logger';
import { Elysia } from 'elysia';

/**
 * Standalone logger instance that can be used outside Elysia context.
 * Use this for logging server startup, port information, etc.
 */
export const appLogger = createPinoLogger({
  level: 'info',
});

/**
 * Elysia plugin for logging using @bogeychan/elysia-logger (pino).
 *
 * @param userConfig Optional logger config overrides.
 *
 * Example:
 *   pluginLogging({ autoLogging: true })
 */
export const pluginLogging = (userConfig: Record<string, unknown> = {}) => {
  return new Elysia().use(appLogger.into(userConfig));
};
