import cors from '@elysiajs/cors';
import serverTiming from '@elysiajs/server-timing';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { env } from '../../../config/envs';
import { pluginGracefulServer } from './plugins/graceful_shutdown/graceful_shutdown';
import { logger } from './plugins/logger/logging';
import { consola } from 'consola';

export const http = new Elysia()
  .use(logger())
  .use(pluginGracefulServer({}))
  .use(swagger())
  .use(cors())
  .use(serverTiming())
  .get('/', () => 'Hello World');

export const app = http.listen(env.PORT);

consola.start(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof http;
