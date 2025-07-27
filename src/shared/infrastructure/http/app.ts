import { ResponseHeader } from '@core/constants/http_headers';
import cors from '@elysiajs/cors';
import serverTiming from '@elysiajs/server-timing';
import swagger from '@elysiajs/swagger';
import { consola } from 'consola';
import { Elysia } from 'elysia';
import { MIME_TYPES } from '@/shared/core/constants/mime_types';
import { env } from '../../../config/envs';
import { pluginGracefulServer } from './plugins/graceful_shutdown/graceful_shutdown';
import { HttpStatusCode } from './plugins/http_status_code/http_status_code';
import { logger } from './plugins/logger/simple_logger';
import { createPrometheusPlugin } from './plugins/prometheus/prometheus-plugin';
import { requestID } from './plugins/request_id/request_id_plugin';

export const http = new Elysia()
  .use(requestID())
  .use(HttpStatusCode())
  .use(logger())
  .use(pluginGracefulServer({}))
  .use(createPrometheusPlugin())
  .use(swagger())
  .use(cors())
  .use(serverTiming())
  .get('/', () => 'Hello World')

  .all('*', ({ request, httpStatus, set }) => {
    consola.warn(`Unmatched route: ${request.method} ${request.url}`);
    set.status = httpStatus.NotFound;
    return new Response(
      JSON.stringify({
        error: true,
        message: `Route not found: ${request.method} ${new URL(request.url).pathname}`,
        code: 'NOT_FOUND',
        statusCode: httpStatus.NotFound,
      }),
      {
        status: httpStatus.NotFound,
        headers: { [ResponseHeader.ContentType]: MIME_TYPES.Application.Json },
      }
    );
  });

export const app = http.listen(env.PORT);

consola.start(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof http;
