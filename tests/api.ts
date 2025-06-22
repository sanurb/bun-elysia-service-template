import { treaty } from '@elysiajs/eden';
import { http, type App } from '../src/shared/infrastructure/http/app';

export const api = treaty<App>(http);
