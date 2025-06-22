import { EventEmitter } from 'node:events';
import { Singleton } from 'tstl';

class GracefulShutdownState {
  isReady = false;
  readonly eventEmitter = new EventEmitter();
}

const gracefulShutdownStateSingleton = new Singleton<GracefulShutdownState>(
  () => new GracefulShutdownState()
);

/**
 * Singleton state for graceful shutdown.
 * This is used to share state between the plugin and the `setServerIsReady` function,
 * avoiding the use of global variables.
 */
export const gracefulShutdownState: GracefulShutdownState =
  gracefulShutdownStateSingleton.get();
