import { Elysia } from 'elysia';
import { HTTP_STATUS } from '@/shared/core/constants/http_status';

export const HttpStatusCode = () =>
  new Elysia({ name: 'http-status-code' }).decorate({
    httpStatus: HTTP_STATUS,
  });
