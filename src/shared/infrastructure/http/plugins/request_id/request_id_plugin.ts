import { randomUUID } from 'node:crypto';
import Elysia from 'elysia';

type Options = {
  uuid?: () => string;
  header?: string;
};

export const requestID = ({
  uuid = randomUUID,
  header = 'X-Request-ID',
}: Readonly<Options> = {}) => {
  return new Elysia({ name: 'request-id', seed: header })
    .on('request', ({ set, request: { headers } }) => {
      set.headers[header] = headers.get(header) || uuid();
    })
    .derive(({ request, set }) => {
      return {
        requestID: set.headers[header],
      };
    });
};
