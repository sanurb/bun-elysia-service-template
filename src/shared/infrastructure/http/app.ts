import { HTTP_STATUS as Status } from '@core/constants/http_status';
import cors from '@elysiajs/cors';
import serverTiming from '@elysiajs/server-timing';
import swagger from '@elysiajs/swagger';
import { consola } from 'consola';
import { Elysia } from 'elysia';
import { env } from '../../../config/envs';
import { pluginGracefulServer } from './plugins/graceful_shutdown/graceful_shutdown';
import { logger } from './plugins/logger/simple_logger';
import { requestID } from './plugins/request_id/request_id_plugin';

export const http = new Elysia()
  .use(requestID())
  .use(logger())
  .use(pluginGracefulServer({}))
  .use(swagger())
  .use(cors())
  .use(serverTiming())
  .get('/', () => 'Hello World')

  .all('*', ({ request }) => {
    consola.warn(`Unmatched route: ${request.method} ${request.url}`);
    return new Response(
      JSON.stringify({
        error: true,
        message: `Route not found: ${request.method} ${new URL(request.url).pathname}`,
        code: 'NOT_FOUND',
      }),
      {
        status: Status.NotFound,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  });

export const app = http.listen(env.PORT);

consola.start(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof http;
