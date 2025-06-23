import type Elysia from 'elysia';
import { importClassesFromDirectories } from './import_classes';
import type { ControllersLoaderOptions, ElysiaRoute } from './types';

export class ControllerManager {
  constructor(protected readonly options: ControllersLoaderOptions) {}

  load(app: Elysia) {
    for (const controller of this.getControllers()) {
      const instance = this.getInstance(controller);

      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: ElysiaRoute[] = Reflect.getMetadata('routes', controller);
      for (const route of routes) {
        const segments = route.path.split('/');

        route.path = '';
        for (let i = 1; i < segments.length; i++) {
          route.path += `/${segments[i]?.replace(/\?$/, '')}`;

          // Make route for current path if next segment does not exist or is optional
          const needRouting = segments[i + 1]?.endsWith('?') ?? true;
          if (!needRouting) {
            continue;
          }

          if (route.method === 'WS') {
            app.ws(`${prefix}${route.path}`, {
              ...route.options,
              message: (ctx: any) =>
                Promise.resolve(instance[route.methodName](ctx)),
            } as any);
            continue;
          }
          app.route(
            route.method,
            `${prefix}${route.path}`,
            (ctx: any) => Promise.resolve(instance[route.methodName](ctx)),
            route.options
          );
        }
      }
    }
    return app;
  }

  protected getInstance(identifier: any) {
    if (this.options.container) {
      return this.options.container.get(identifier);
    }

    return new identifier();
  }

  protected getControllers(): Function[] {
    const controllerClasses: Function[] = (
      this.options.controllers as any[]
    ).filter((controller) => controller instanceof Function);

    return [...controllerClasses, ...this.getControllersFromDirs()];
  }

  protected getControllersFromDirs(): Function[] {
    const controllerDirs = (this.options.controllers as any[]).filter(
      (controller) => typeof controller === 'string'
    );

    return importClassesFromDirectories(controllerDirs);
  }
}
