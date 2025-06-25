/**
 * @fileoverview Defines the core types for a decorator-based routing system
 * for Elysia.js. These types are designed to be generic to provide strong
 * type safety and inference within controllers.
 */

import type {
  Context,
  DefinitionBase,
  EphemeralType,
  HTTPMethod,
  InputSchema,
  LocalHook,
  MergeSchema,
  MetadataBase,
  SingletonBase,
  UnwrapRoute,
} from 'elysia';
import type { Class } from 'type-fest';

// --- DI Container and Loader Configuration ---

/**
 * Represents a dependency injection container, responsible for instantiating
 * controllers.
 */
export interface Container {
  get<T = unknown>(identifier: string | symbol | Class<T>): T;
}

/**
 * Defines the options for the main loader function that registers controllers.
 */
export interface ControllersLoaderOptions<
  C extends readonly (Class<unknown> | string)[] = readonly (
    | Class<unknown>
    | string
  )[],
> {
  /** Controller constructors or paths—preserve as a tuple! */
  readonly controllers: C;
  /** Optional DI container. */
  readonly container?: Container;
}

// --- Core Decorator and Route Types ---

/**
 * Optional configuration for decorators.
 */
interface Config {
  config?: {
    /**
     * @private
     * Internal flag for Elysia's macro system.
     */
    allowMeta?: boolean;
  };
}

/**
 * Defines the complete set of hook and schema options for a route decorator.
 *
 * This is a `type` alias instead of an `interface` because it combines complex
 * generic types.
 *
 * @template TSingleton The application's singleton state shape.
 * @template TDefinitions The application's definition state shape.
 * @template TMetadata The application's metadata state shape.
 * @template TEphemeral The application's ephemeral (request-scoped) state.
 * @template TVolatile The application's volatile (handler-scoped) state.
 * @template TPath The literal string type of the route's path.
 * @template TLocalSchema The schema definition local to this specific route.
 */
export type RouteOptions<
  TSingleton extends SingletonBase = SingletonBase,
  TDefinitions extends DefinitionBase = DefinitionBase,
  TMetadata extends MetadataBase = MetadataBase,
  TEphemeral extends EphemeralType = EphemeralType,
  TVolatile extends EphemeralType = EphemeralType,
  TPath extends string = string,
  TLocalSchema extends InputSchema = InputSchema,
> = LocalHook<
  TLocalSchema,
  MergeSchema<
    UnwrapRoute<TLocalSchema, TDefinitions['typebox'], TPath>,
    TMetadata['schema'] & TEphemeral['schema'] & TVolatile['schema']
  >,
  TSingleton & {
    derive: TEphemeral['derive'] & TVolatile['derive'];
    resolve: TEphemeral['resolve'] & TVolatile['resolve'];
  },
  TDefinitions['error'],
  TMetadata['macro'],
  keyof TMetadata['parser'] & string
> &
  Config;

/**
 * Represents the metadata for a single route collected by a decorator.
 *
 * This type is now generic to carry the full type information of the route,
 * enabling type-safe processing by a controller loader.
 *
 * @template TSingleton The application's singleton state shape.
 * @template TDefinitions The application's definition state shape.
 * ...and so on for other state components.
 * @template TPath The literal path of the route (e.g., `'/users/:id'`).
 * @template TLocalSchema The schema definition local to this route.
 */
export interface ElysiaRoute<
  TSingleton extends SingletonBase = SingletonBase,
  TDefinitions extends DefinitionBase = DefinitionBase,
  TMetadata extends MetadataBase = MetadataBase,
  TEphemeral extends EphemeralType = EphemeralType,
  TVolatile extends EphemeralType = EphemeralType,
  TPath extends string = string,
  TLocalSchema extends InputSchema = InputSchema,
> {
  method: HTTPMethod;
  path: TPath;
  methodName: string | symbol;
  options?: RouteOptions<
    TSingleton,
    TDefinitions,
    TMetadata,
    TEphemeral,
    TVolatile,
    TPath,
    TLocalSchema
  >;
}

/**
 * Computes the exact `Context` type for a controller handler based on the
 * route's metadata. This utility demonstrates the benefit of the generic types,
 * allowing for a perfectly typed `context` object.
 *
 * @template TRoute The `ElysiaRoute` metadata object for the handler.
 */
export type HandlerContext<TRoute> = TRoute extends ElysiaRoute<
  infer TSingleton,
  infer TDefinitions,
  infer TMetadata,
  infer TEphemeral,
  infer TVolatile,
  infer TPath,
  infer TLocalSchema
>
  ? Context<
      MergeSchema<
        UnwrapRoute<TLocalSchema, TDefinitions['typebox'], TPath>,
        TMetadata['schema'] & TEphemeral['schema'] & TVolatile['schema']
      >,
      TSingleton & {
        derive: TEphemeral['derive'] & TVolatile['derive'];
        resolve: TEphemeral['resolve'] & TVolatile['resolve'];
      }
    >
  : Context; // Fallback to a base Context if inference fails.

/**
 * Represents the signature of a fully typed controller method.
 *
 * @template TRoute The `ElysiaRoute` metadata object.
 */
export type ControllerHandler<TRoute> = (
  context: HandlerContext<TRoute>
) => any;
