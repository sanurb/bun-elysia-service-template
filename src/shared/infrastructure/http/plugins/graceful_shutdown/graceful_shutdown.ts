import { Elysia, status, t } from 'elysia';
import { gracefulShutdownState } from './graceful_shutdown_state';

interface PluginGracefulServer {
  serverIsReadyOnStart?: boolean;
  livenessEndpoint?: string;
  readinessEndpoint?: string;
  closePromises?: readonly Promise<void>[];
  onStart?: () => Promise<void> | void;
  onReady?: () => Promise<void> | void;
  onShuttingDown?: () => Promise<void> | void;
  onShutdown?: () => Promise<void> | void;
}

/**
 * Elysia plugin for graceful server shutdown.
 *
 * Adds liveness and readiness endpoints and handles signals for graceful shutdown.
 * @param userConfig Optional configuration for the plugin.
 */
export const pluginGracefulServer = (userConfig: PluginGracefulServer = {}) => {
  // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
  const noop = async () => {};

  const defaultConfig: Required<PluginGracefulServer> = {
    livenessEndpoint: '/live',
    readinessEndpoint: '/ready',
    serverIsReadyOnStart: false,
    closePromises: [],
    onStart: noop,
    onReady: noop,
    onShuttingDown: noop,
    onShutdown: noop,
  };

  const config = { ...defaultConfig, ...userConfig };

  gracefulShutdownState.eventEmitter.once('ready', () => {
    config.onReady();
  });

  return new Elysia()
    .state('startedSince', Date.now())

    .get(
      config.readinessEndpoint,
      () => {
        if (gracefulShutdownState.isReady) {
          return {
            status: 'ready',
          };
        }

        return status(500);
      },
      {
        response: {
          500: t.Any(),
          200: t.Object({
            status: t.String(),
          }),
        },
      }
    )

    .get(
      config.livenessEndpoint,
      ({ store: { startedSince } }) => {
        return {
          uptime: Math.round((Date.now() - startedSince) / 1000),
        };
      },
      {
        response: {
          200: t.Object({
            uptime: t.Number(),
          }),
        },
      }
    )

    .on('start', () => {
      config.onStart();

      if (config.serverIsReadyOnStart) {
        setServerIsReady();
      }
    })
    .on('stop', async () => {
      config.onShuttingDown();
      await Promise.all(config.closePromises);
      config.onShutdown();
    });
};

/**
 * Sets the server state to ready.
 *
 * This will cause the readiness endpoint to return a 200 OK status,
 * indicating that the server is ready to handle traffic.
 */
export const setServerIsReady = (): void => {
  gracefulShutdownState.isReady = true;

  gracefulShutdownState.eventEmitter.emit('ready');
};
