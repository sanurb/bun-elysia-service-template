import type {
  DefinitionBase,
  EphemeralType,
  HTTPMethod,
  InputSchema,
  LocalHook,
  MergeSchema,
  SingletonBase,
  UnwrapRoute,
} from 'elysia';
import type { MetadataBase } from 'elysia/types';
import type { Class, EmptyObject } from 'type-fest';

interface Container {
  get(identifier: string | symbol): () => unknown;
}

interface Singleton extends SingletonBase {
  decorator: EmptyObject;
  store: EmptyObject;
  derive: EmptyObject;
  resolve: EmptyObject;
}

interface Definitions extends DefinitionBase {
  type: EmptyObject;
  error: EmptyObject;
}

interface Metadata extends MetadataBase {
  schema: Record<string, unknown>;
  macro: EmptyObject;
}

interface Ephemeral extends EphemeralType {
  derive: EmptyObject;
  resolve: EmptyObject;
  schema: Record<string, unknown>;
}

interface Volatile extends EphemeralType {
  derive: EmptyObject;
  resolve: EmptyObject;
  schema: Record<string, unknown>;
}

interface LocalSchema extends InputSchema<keyof Definitions['type'] & string> {}
interface Schema
  extends MergeSchema<
    UnwrapRoute<LocalSchema, Definitions['type']>,
    Metadata['schema'] & Ephemeral['schema'] & Volatile['schema']
  > {}

export interface ControllersLoaderOptions {
  controllers: Class<unknown>[] | string[];
  container?: Container;
}

interface Hook
  extends LocalHook<
    LocalSchema,
    Schema,
    Singleton & {
      derive: Ephemeral['derive'] & Volatile['derive'];
      resolve: Ephemeral['resolve'] & Volatile['resolve'];
    },
    Definitions['error'],
    Metadata['macro'],
    string
  > {}

interface Config {
  config: {
    allowMeta?: boolean;
  };
}

export interface RouteOptions extends Hook, Config {}

export interface ElysiaRoute {
  method: HTTPMethod;
  path: string;
  methodName: string | symbol;
  options?: RouteOptions;
}
