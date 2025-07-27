import { treaty } from '@elysiajs/eden';
import { type App, http } from '../src/shared/infrastructure/http/app';

export const api = treaty<App>(http);
