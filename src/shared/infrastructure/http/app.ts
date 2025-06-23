import { HealthController } from '@/modules/health/health_controller';
import cors from '@elysiajs/cors';
import serverTiming from '@elysiajs/server-timing';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { env } from '../../../config/envs';
import { CatMapper } from '../../../modules/cat/application/mappers/cat_mapper';
import { setupCatController } from '../../../modules/cat/infrastructure/http/cat_controller';
import { InMemoryCatRepository } from '../../../modules/cat/infrastructure/in_memory_cat_repository';
import { decorators } from './plugins/decorators';
import { pluginGracefulServer } from './plugins/graceful_shutdown/graceful_shutdown';
import { otel } from './plugins/otel/otel';

const catRepository = new InMemoryCatRepository();
const catController = setupCatController(catRepository, CatMapper);

export const http = new Elysia()
  .use(pluginGracefulServer({}))
  .use(swagger())
  .use(cors())
  .use(serverTiming())
  .use(otel)
  .use(
    decorators({
      controllers: [HealthController],
    })
  )
  .use(catController)
  .get('/', () => 'Hello World');

export const app = http.listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof http;
