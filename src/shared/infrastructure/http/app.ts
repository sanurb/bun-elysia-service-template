import cors from '@elysiajs/cors';
import serverTiming from '@elysiajs/server-timing';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { env } from '../../../config/envs';
import { catController } from '../../../modules/cat/infrastructure/http/cat_controller';
import { pluginGracefulServer } from './plugins/graceful_shutdown/graceful_shutdown';

export const http = new Elysia()
  .use(pluginGracefulServer({}))
  .use(swagger())
  .use(cors())
  .use(serverTiming())
  .use(catController)
  .get('/', () => 'Hello World');

export const app = http.listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof http;
