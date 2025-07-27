import { type Context, Elysia } from 'elysia';
import {
  Counter,
  type CounterConfiguration,
  collectDefaultMetrics,
  Histogram,
  type HistogramConfiguration,
  Registry,
} from 'prom-client';

// Constants for default values and configuration
const DEFAULT_METRICS_PATH = '/metrics';
const DEFAULT_DURATION_BUCKETS = [0.003, 0.03, 0.1, 0.3, 1.5, 10] as const;
const DEFAULT_USE_ROUTE_PATH = true;

// Reserved label names that cannot be overridden
const RESERVED_LABEL_NAMES = ['method', 'path', 'status'] as const;
const REQUIRED_LABEL_NAMES = [...RESERVED_LABEL_NAMES] as const;

// Metric names and descriptions
const METRIC_NAMES = {
  HTTP_REQUESTS_TOTAL: 'http_requests_total',
  HTTP_REQUEST_DURATION_SECONDS: 'http_request_duration_seconds',
} as const;

const METRIC_HELP_TEXTS = {
  HTTP_REQUESTS_TOTAL: 'Total HTTP requests count',
  HTTP_REQUEST_DURATION_SECONDS: 'HTTP request duration in seconds',
} as const;

// HTTP status codes
const HTTP_STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Plugin configuration name
const PLUGIN_NAME = 'prometheus';

interface PluginOptions {
  /** Path to metrics endpoint (default /metrics) */
  readonly metricsPath: string;
  /** Buckets for duration histogram (default [0.003, 0.03, 0.1, 0.3, 1.5, 10]) */
  readonly durationBuckets: number[];
  /** Additional static labels for all metrics */
  readonly staticLabels: Readonly<Record<string, string>>;
  /** Dynamic labels for all metrics */
  readonly dynamicLabels: Readonly<Record<string, (ctx: Context) => string>>;
  /** Use normalized route path for metrics */
  readonly useRoutePath: boolean;
}

interface UserPluginOptions extends Partial<PluginOptions> {}

const DEFAULT_OPTIONS: PluginOptions = {
  metricsPath: DEFAULT_METRICS_PATH,
  durationBuckets: [...DEFAULT_DURATION_BUCKETS],
  staticLabels: {},
  dynamicLabels: {},
  useRoutePath: DEFAULT_USE_ROUTE_PATH,
};

export default (userOptions: UserPluginOptions = {}) => {
  const opts: PluginOptions = { ...DEFAULT_OPTIONS, ...userOptions };

  const register = new Registry();
  collectDefaultMetrics({ register });

  const reservedLabels = new Set<string>(RESERVED_LABEL_NAMES);
  const allLabels = { ...opts.staticLabels, ...opts.dynamicLabels };

  for (const label of Object.keys(allLabels)) {
    if (reservedLabels.has(label)) {
      throw new Error(`Label '${label}' is reserved`);
    }
  }

  const labelNames = [
    ...REQUIRED_LABEL_NAMES,
    ...Object.keys(opts.staticLabels),
    ...Object.keys(opts.dynamicLabels),
  ];

  const httpRequestCounter = new Counter({
    name: METRIC_NAMES.HTTP_REQUESTS_TOTAL,
    help: METRIC_HELP_TEXTS.HTTP_REQUESTS_TOTAL,
    labelNames,
    registers: [register],
  } satisfies CounterConfiguration<string>);

  const httpRequestDuration = new Histogram({
    name: METRIC_NAMES.HTTP_REQUEST_DURATION_SECONDS,
    help: METRIC_HELP_TEXTS.HTTP_REQUEST_DURATION_SECONDS,
    labelNames,
    buckets: opts.durationBuckets,
    registers: [register],
  } satisfies HistogramConfiguration<string>);

  /**
   * Extracts the HTTP status code from the Elysia context
   * @param ctx - The Elysia context
   * @returns The status code as a string
   */
  const getStatusCode = (ctx: Context): string => {
    // Primary: Check ctx.set.status (the standard way to access status in Elysia)
    if (typeof ctx.set?.status === 'number') {
      return ctx.set.status.toString();
    }

    // Secondary: Check if we're in an error context
    // In Elysia, error handlers receive a different context with error information
    // The status is typically set via ctx.status() in error handlers
    if ('error' in ctx) {
      // If we're in an error context, return default error status
      return HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.toString();
    }

    return HTTP_STATUS_CODES.OK.toString();
  };

  /**
   * Creates metric labels from the Elysia context
   * @param ctx - The Elysia context
   * @returns Object containing all metric labels
   */
  const getLabels = (ctx: Context): Readonly<Record<string, string>> => {
    const path = opts.useRoutePath
      ? (ctx.route as string) || ctx.path
      : ctx.path;

    const labels: Record<string, string> = {
      method: ctx.request.method,
      path: normalizePath(path),
      status: getStatusCode(ctx),
      ...opts.staticLabels,
    };

    // Add dynamic labels
    for (const [key, fn] of Object.entries(opts.dynamicLabels)) {
      labels[key] = fn(ctx as any); // Type assertion needed for dynamic labels
    }

    return Object.freeze(labels);
  };

  /**
   * Normalizes path parameters for consistent metric labeling
   * Replaces numeric IDs with ':id' placeholder to group similar routes
   * @param path - The request path to normalize
   * @returns Normalized path with ID placeholders
   */
  const normalizePath = (path: string): string => {
    return path.replace(/\/\d+([/?]|$)/g, '/:id$1');
  };

  return new Elysia({ name: PLUGIN_NAME })
    .derive({ as: 'global' }, (ctx) => ({
      endTimer: httpRequestDuration.startTimer(getLabels(ctx)),
    }))
    .onAfterHandle({ as: 'global' }, (ctx) => {
      if (ctx.path.endsWith(opts.metricsPath)) return;

      const labels = getLabels(ctx as any);
      httpRequestCounter.inc(labels);
      ctx.endTimer(labels);
    })
    .onError({ as: 'global' }, (ctx) => {
      if (!ctx.endTimer || ctx.path.endsWith(opts.metricsPath)) return;

      const labels = getLabels(ctx as any);
      httpRequestCounter.inc(labels);
      ctx.endTimer(labels);
    })
    .get(opts.metricsPath, async () => {
      return new Response(await register.metrics(), {
        headers: { 'Content-Type': register.contentType },
      });
    });
};
