import { Elysia } from 'elysia';
import { env } from '../../../config/envs';

const app = new Elysia()
  .state('startedSince', Date.now())
  .get('/', () => 'Hello Elysia')
  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
