import { consola } from 'consola';
import Elysia from 'elysia';
import { HTTP_STATUS as Status } from '@core/constants/http_status';

export const logger = ({ methods = ['GET', 'PUT', 'POST', 'DELETE'] } = {}) =>
  new Elysia({ name: 'logger' })
    .derive({ as: 'global' }, () => ({ start: Date.now() }))
    .onBeforeHandle({ as: 'global' }, (ctx) => {
      if (!methods.includes(ctx.request.method)) return;
      consola.info(`<-- ${ctx.request.method} ${ctx.path}`);
    })
    .onAfterHandle({ as: 'global' }, (ctx) => {
      if (!methods.includes(ctx.request.method)) return;
      consola.info(
        `--> ${ctx.request.method} ${ctx.path} ${ctx.set.status ?? Number.NaN} in ${Date.now() - ctx.start} ms`
      );
    })
    .onError({ as: 'global' }, (ctx) => {
      if (!methods.includes(ctx.request.method)) return;
      const code = ctx.code;
      if (
        code === 'NOT_FOUND' &&
        (ctx.request.url.includes('favicon.ico') ||
          ctx.request.url.includes('.ico') ||
          ctx.request.url.includes('.png') ||
          ctx.request.url.includes('.svg'))
      ) {
        return new Response(null, { status: Status.NotFound });
      }
      consola.error(
        `--> ${ctx.request.method} ${ctx.path} ${typeof ctx.set.status === 'number' ? ctx.set.status : 'unknown'} in ${typeof ctx.start === 'number' ? Date.now() - ctx.start : 0} ms`
      );
    });
