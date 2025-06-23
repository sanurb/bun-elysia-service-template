import type { Elysia } from 'elysia';
import 'reflect-metadata';
import { ControllerManager } from './controller_manager';
import type { ControllersLoaderOptions } from './types';

export const decorators =
  (options: ControllersLoaderOptions) => (app: Elysia) =>
    new ControllerManager(options).load(app);

export * from './custom_decorators/controller_decorator';
export * from './custom_decorators/factory';
