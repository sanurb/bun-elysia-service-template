import { Elysia } from 'elysia';
import { env } from '../../../config/envs';
import { pluginGracefulServer } from './plugins/graceful_shutdown/graceful_shutdown';

const app = new Elysia()
  .use(pluginGracefulServer({}))
  .get('/', () => 'Hello Elysia')
  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
