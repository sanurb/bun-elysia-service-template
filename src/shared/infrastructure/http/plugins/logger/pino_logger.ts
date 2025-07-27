import { randomUUID } from 'node:crypto';
import {
  createPinoLogger,
  formatters,
  isContext,
} from '@bogeychan/elysia-logger';
import { Elysia } from 'elysia';
import { isProduction } from 'std-env';

/**
 * Paths and patterns to skip logging
 */
const SKIP_PATTERNS = {
  healthPaths: ['/health', '/live', '/ready'],
  staticPaths: ['/static'],
  staticExtensions: ['.ico', '.png', '.jpg', '.css', '.js'],
  faviconPattern: 'favicon',
} as const;

/**
 * Checks if a request should be skipped from logging
 */
const shouldSkipRequest = (path: string, url: string): boolean => {
  return (
    SKIP_PATTERNS.healthPaths.some((healthPath) =>
      path.startsWith(healthPath)
    ) ||
    SKIP_PATTERNS.staticPaths.some((staticPath) =>
      path.startsWith(staticPath)
    ) ||
    SKIP_PATTERNS.staticExtensions.some((ext) => path.includes(ext)) ||
    url.includes(SKIP_PATTERNS.faviconPattern)
  );
};

/**
 * Determines log level based on status code
 */
const getLogLevel = (statusCode: number): 'info' | 'warn' | 'error' => {
  if (statusCode >= 500) return 'error';
  if (statusCode >= 400) return 'warn';
  return 'info';
};

/**
 * Creates a Pino logger instance with environment-based configuration
 */
const createLogger = () => {
  const baseConfig = {
    level: 'info' as const,
    serializers: {
      request: (request: Request) => {
        const url = new URL(request.url);
        return {
          id: request.headers.get('X-Request-ID') ?? randomUUID(),
          method: request.method,
          url: request.url,
          path: url.pathname,
          query: Object.fromEntries(url.searchParams.entries()),
          userAgent: request.headers.get('user-agent'),
          ip:
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown',
        };
      },
    },
  };

  if (isProduction) {
    return createPinoLogger({
      ...baseConfig,
      formatters: {
        ...formatters,
        log(object) {
          if (isContext(object)) {
            return {
              requestId: (object as any).requestId,
              timestamp: new Date().toISOString(),
            };
          }
          return formatters.log(object);
        },
      },
    });
  }

  return createPinoLogger({
    ...baseConfig,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        messageFormat:
          '{msg} {req.method} {req.url} {res.statusCode} {responseTime}ms',
      },
    },
  });
};

/**
 * Standalone logger instance for use outside Elysia context
 */
export const appLogger = createLogger();

/**
 * Elysia plugin for comprehensive logging using Pino
 *
 * Features:
 * - Single structured log entry per request
 * - Environment-based configuration (pretty in dev, JSON in prod)
 * - Semantic log levels based on status codes
 * - Request ID tracking
 * - Essential fields only (statusCode, responseTimeMs, userAgent, IP)
 * - Centralized skip logic for health checks and static assets
 *
 * @returns Elysia plugin with logging capabilities
 *
 * @example
 * ```typescript
 * app.use(pinoLogger())
 * ```
 */
export const pinoLogger = (): any => {
  const log = createLogger();

  return new Elysia({ name: 'pino-logger' })
    .derive({ as: 'global' }, () => ({
      startTime: Date.now(),
      requestId: randomUUID(),
    }))
    .onAfterHandle({ as: 'global' }, (ctx) => {
      // Skip health checks and static assets
      if (shouldSkipRequest(ctx.path, ctx.request.url)) {
        return;
      }

      const responseTime = Date.now() - ctx.startTime;
      const statusCode = Number(ctx.set.status);
      const logLevel = getLogLevel(statusCode);

      // Single structured log with essential fields only
      log[logLevel](
        {
          requestId: ctx.requestId,
          method: ctx.request.method,
          path: ctx.path,
          statusCode,
          responseTimeMs: responseTime,
          userAgent: ctx.request.headers.get('user-agent'),
          ip:
            ctx.request.headers.get('x-forwarded-for') ||
            ctx.request.headers.get('x-real-ip') ||
            'unknown',
        },
        `Request ${ctx.request.method} ${ctx.path} ${statusCode} ${responseTime}ms`
      );
    })
    .onError({ as: 'global' }, (ctx) => {
      // Skip health checks and static assets
      if (shouldSkipRequest(ctx.path, ctx.request.url)) {
        return;
      }

      const responseTime = ctx.startTime ? Date.now() - ctx.startTime : 0;
      const statusCode = ctx.set.status ?? 500;
      const error = ctx.error as any;
      const errorName = error?.name || 'UnknownError';
      const errorMessage = error?.message || 'Unknown error occurred';
      const code = ctx.code;

      // Single structured error log with essential fields
      const shouldShowDetails = isProduction && code !== 'NOT_FOUND';
      const details = shouldShowDetails
        ? {
            userAgent: ctx.request.headers.get('user-agent'),
            ip:
              ctx.request.headers.get('x-forwarded-for') ||
              ctx.request.headers.get('x-real-ip') ||
              'unknown',
            errorName,
            errorMessage,
            errorStack: error?.stack,
          }
        : {};

      log.error(
        {
          requestId: ctx.requestId,
          method: ctx.request.method,
          path: ctx.path,
          statusCode,
          responseTimeMs: responseTime,
          ...details,
        },
        `${errorName}: ${errorMessage} - ${ctx.request.method} ${ctx.path} ${statusCode} ${responseTime}ms`
      );
    })
    .use(log.into());
};
