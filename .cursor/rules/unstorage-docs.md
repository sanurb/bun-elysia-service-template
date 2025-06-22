TITLE: Initialize unstorage and Get Item - JavaScript
DESCRIPTION: Demonstrates how to create a new unstorage instance using `createStorage` and how to retrieve an item's value asynchronously using `getItem` or its alias `get`. By default, unstorage uses the memory driver if no options are provided.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { createStorage } from "unstorage";

const storage = createStorage(/* opts */);

await storage.getItem("foo:bar"); // or storage.getItem('/foo/bar')
```

----------------------------------------

TITLE: Installing Unstorage Package
DESCRIPTION: Commands to install the unstorage library using different Node.js package managers (yarn, npm, pnpm). This is the first step to using the library.
SOURCE: https://github.com/unjs/unstorage/blob/main/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
yarn add unstorage
```

LANGUAGE: sh
CODE:
```
npm install unstorage
```

LANGUAGE: sh
CODE:
```
pnpm add unstorage
```

----------------------------------------

TITLE: Initializing and Querying Unstorage JS
DESCRIPTION: Demonstrates how to import the createStorage function, initialize a storage instance, and asynchronously retrieve an item using the getItem method. This shows a basic interaction pattern with the library.
SOURCE: https://github.com/unjs/unstorage/blob/main/README.md#_snippet_1

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";

const storage = createStorage(/* opts */);

await storage.getItem("foo:bar"); // or storage.getItem('/foo/bar')
```

----------------------------------------

TITLE: Initializing Storage with Memory Driver (JavaScript)
DESCRIPTION: This snippet demonstrates how to create a new storage instance using the 'memory' driver. It requires importing the `createStorage` function from 'unstorage' and the `memoryDriver` function from 'unstorage/drivers/memory'. The `createStorage` function is called with an options object specifying the `memoryDriver()` as the desired storage mechanism.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/memory.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

const storage = createStorage({
  driver: memoryDriver(),
});
```

----------------------------------------

TITLE: Remove Item - unstorage - JavaScript
DESCRIPTION: Illustrates how to remove a key-value pair from storage using `removeItem`. The optional `removeMeta` flag can be used to also explicitly remove any associated metadata.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
await storage.removeItem("foo:bar", { removeMeta: true });
// same as await storage.removeItem("foo:bar", true);
```

----------------------------------------

TITLE: Get All Keys - unstorage - JavaScript
DESCRIPTION: Shows how to retrieve a list of all keys stored in the system using `getKeys`. Metadata keys (ending with `$`) are automatically filtered out. An optional base path can filter keys.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_7

LANGUAGE: JavaScript
CODE:
```
await storage.getKeys();
```

----------------------------------------

TITLE: Initializing Unstorage with Single Redis Instance (JavaScript)
DESCRIPTION: This snippet demonstrates how to configure Unstorage to use the Redis driver for a single Redis instance. It requires the `unstorage` and `ioredis` packages and sets basic connection options like host, port, password, TLS, and a key base prefix.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/redis.md#_snippet_0

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

const storage = createStorage({
  driver: redisDriver({
    base: "unstorage",
    host: 'HOSTNAME',
    tls: true as any,
    port: 6380,
    password: 'REDIS_PASSWORD'
  }),
});
```

----------------------------------------

TITLE: Initializing S3 Driver Configuration with unstorage - TypeScript
DESCRIPTION: This snippet demonstrates how to configure and initialize an unstorage instance using the S3 driver. It requires importing `createStorage` from "unstorage" and the S3 driver itself. The `s3Driver` function is called with a configuration object containing necessary S3 credentials and connection details such as `accessKeyId`, `secretAccessKey`, `endpoint`, `bucket`, and `region`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/s3.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import { createStorage } from "unstorage";
import s3Driver from "unstorage/drivers/s3";

const storage = createStorage({
  driver: s3Driver({
    accessKeyId: "", // Access Key ID
    secretAccessKey: "", // Secret Key ID
    endpoint: "",
    bucket: "",
    region: "",
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Redis Cluster (JavaScript)
DESCRIPTION: This example shows configuring Unstorage for a Redis cluster connection. It requires `unstorage` and `ioredis`, uses the `cluster` option with node details, includes `clusterOptions` for common Redis options like TLS and password, and emphasizes using a `hashtags` base prefix (`{unstorage}`) for cross-slot key handling.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/redis.md#_snippet_1

LANGUAGE: js
CODE:
```
const storage = createStorage({
  driver: redisDriver({
    base: "{unstorage}",
    cluster: [
      {
        port: 6380,
        host: "HOSTNAME",
      },
    ],
    clusterOptions: {
      redisOptions: {
        tls: { servername: "HOSTNAME" },
        password: "REDIS_PASSWORD",
      },
    },
  }),
});
```

----------------------------------------

TITLE: Type Unstorage Method Calls - TypeScript
DESCRIPTION: Demonstrates how to provide type hints for return values of `getItem` and `getItemRaw`, and how to enable type checking for the `value` parameter in `setItem` and `setItemRaw` using TypeScript generics.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_16

LANGUAGE: TypeScript
CODE:
```
await storage.getItem<string>("k"); // => <string>

await storage.getItemRaw<Buffer>("k"); // => <Buffer>

storage.setItem<string>("k", "val"); // check ok
storage.setItemRaw<string>("k", "val"); // check ok

storage.setItem<string>("k", 123); // ts error
storage.setItemRaw<string>("k", 123); // ts error
```

----------------------------------------

TITLE: Create Type-Safe Unstorage Instance - TypeScript
DESCRIPTION: Shows how to create a `createStorage` instance with a default type using generics. This ensures that all subsequent `getItem` calls on this instance are typed with the specified type and `setItem` calls require a value of that type.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_17

LANGUAGE: TypeScript
CODE:
```
const storage = createStorage<string>();

await storage.getItem("k"); // => <string>

storage.setItem("k", "val"); // Check ok
storage.setItem("k", 123); // TS error
```

----------------------------------------

TITLE: Creating Namespaced Storage with prefixStorage (TypeScript)
DESCRIPTION: This snippet demonstrates how to use the `prefixStorage` utility to create a namespaced instance of a storage. It takes an existing storage instance and a prefix string, allowing subsequent operations on the new instance to be virtually prefixed. This is useful for organizing keys and limiting access within a larger storage.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/2.utils.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import { createStorage, prefixStorage } from "unstorage";

const storage = createStorage();
const assetsStorage = prefixStorage(storage, "assets");

// Same as storage.setItem('assets:x', 'hello!')
await assetsStorage.setItem("x", "hello!");
```

----------------------------------------

TITLE: Initializing HTTP Driver for unstorage (JavaScript)
DESCRIPTION: This snippet demonstrates how to import the unstorage library and the HTTP driver, then create a storage instance configured to use the HTTP driver. The `base` option, specifying the base URL for the HTTP endpoint, is a required parameter for the driver.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/http.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { createStorage } from "unstorage";
import httpDriver from "unstorage/drivers/http";

const storage = createStorage({
  driver: httpDriver({ base: "http://cdn.com" }),
});
```

----------------------------------------

TITLE: Handle Nullable Return in Strict Mode - TypeScript
DESCRIPTION: Shows how enabling TypeScript's `strict` mode affects the return type of `getItem`, making it `T | null` to explicitly indicate that the key might not exist and the method could return `null`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_20

LANGUAGE: TypeScript
CODE:
```
"use strict";

await storage.getItem<string>("k"); // => <string | null>
```

----------------------------------------

TITLE: Clear All Items - unstorage - JavaScript
DESCRIPTION: Illustrates how to remove all stored key-value pairs from the storage using `clear`. If a base path is provided, only items within mounts matching that base are cleared.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_8

LANGUAGE: JavaScript
CODE:
```
await storage.clear();
```

----------------------------------------

TITLE: Type Prefix Storage - TypeScript
DESCRIPTION: Explains how to create type-safe subsets of a storage instance for specific key prefixes using `prefixStorage` and generics. This allows different parts of the storage to be strictly typed for different data structures.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_19

LANGUAGE: TypeScript
CODE:
```
const storage = createStorage();

const htmlStorage = prefixStorage<string>(storage, "assets:html");

await htmlStorage.getItem("foo.html"); // => <string>

type Post = {
  title: string;
  content: string;
};

const postStorage = prefixStorage<Post>(storage, "assets:posts");

await postStorage.getItem("foo.json"); // => <Post>
```

----------------------------------------

TITLE: Dispose Storage Instance - unstorage - JavaScript
DESCRIPTION: Demonstrates how to dispose of the storage instance using `dispose`. This is important to ensure all mounted storages release open handles before the process exits. Note that disposing also clears in-memory data.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_9

LANGUAGE: JavaScript
CODE:
```
await storage.dispose();
```

----------------------------------------

TITLE: Initializing unstorage with MongoDB Driver (JS)
DESCRIPTION: This snippet demonstrates how to create an unstorage instance configured to use the MongoDB driver. It requires the 'unstorage' and 'unstorage/drivers/mongodb' packages installed. The driver is initialized with a connection string and optional database/collection names, establishing the connection to the MongoDB database.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/mongodb.md#_snippet_0

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import mongodbDriver from "unstorage/drivers/mongodb";

const storage = createStorage({
  driver: mongodbDriver({
    connectionString: "CONNECTION_STRING",
    databaseName: "test",
    collectionName: "test",
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with LocalStorage Driver (JavaScript)
DESCRIPTION: This snippet demonstrates how to create a storage instance configured to use the localStorage driver from the unstorage library. It requires importing the necessary functions and passing the driver with configuration options (like a base key for preventing collisions) to the createStorage function.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/browser.md#_snippet_0

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";

const storage = createStorage({
  driver: localStorageDriver({ base: "app:" }),
});
```

----------------------------------------

TITLE: Mount Driver - unstorage - JavaScript
DESCRIPTION: Explains how to mount a different storage driver (like the filesystem driver) at a specific mountpoint (path) within the storage instance. Operations targeting keys under this mountpoint will be handled by the mounted driver instead of the default one.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_10

LANGUAGE: JavaScript
CODE:
```
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

// Create a storage container with default memory storage
const storage = createStorage({});

storage.mount("/output", fsDriver({ base: "./output" }));

// Writes to ./output/test file
await storage.setItem("/output/test", "works");

// Adds value to in-memory storage
await storage.setItem("/foo", "bar");
```

----------------------------------------

TITLE: Initializing Unstorage with Netlify Blobs Driver (Named Store) - JavaScript
DESCRIPTION: This snippet demonstrates the basic initialization of an Unstorage instance using the `netlify-blobs` driver. It configures the driver with a specific store name. The driver requires the `@netlify/blobs` dependency installed.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/netlify.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { createStorage } from "unstorage";
import netlifyBlobsDriver from "unstorage/drivers/netlify-blobs";

const storage = createStorage({
  driver: netlifyBlobsDriver({
    name: "blob-store-name",
  }),
});
```

----------------------------------------

TITLE: Creating an Unstorage HTTP Server (JavaScript)
DESCRIPTION: This snippet demonstrates how to create an HTTP server that exposes an unstorage instance. It uses `listhen` to listen for requests and `unstorage/server` to handle storage operations. It includes an example of an `authorize` function to control access.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/3.http-server.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { listen } from "listhen";
import { createStorage } from "unstorage";
import { createStorageServer } from "unstorage/server";

const storage = createStorage();
const storageServer = createStorageServer(storage, {
  authorize(req) {
    // req: { key, type, event }
    if (req.type === "read" && req.key.startsWith("private:")) {
      throw new Error("Unauthorized Read");
    }
  },
});

// Alternatively we can use `storageServer.handle` as a middleware
await listen(storageServer.handle);
```

----------------------------------------

TITLE: Initializing unstorage with LRU Cache Driver (JavaScript)
DESCRIPTION: This snippet demonstrates how to initialize an unstorage instance configured to use the `lru-cache` driver. It requires importing `createStorage` from `unstorage` and the `lru-cache` driver function. The driver is instantiated and passed as the `driver` option to `createStorage`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/lru-cache.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { createStorage } from "unstorage";
import lruCacheDriver from "unstorage/drivers/lru-cache";

const storage = createStorage({
  driver: lruCacheDriver(),
});
```

----------------------------------------

TITLE: Initialize Unstorage with Vercel Blob Driver (JavaScript)
DESCRIPTION: This snippet shows how to create an `unstorage` instance configured to use the `vercel-blob` driver. It requires `@vercel/blob` to be installed. The `access` option is mandatory and must be set to `public`; optional configuration options include `token`, `base`, and `envPrefix`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/vercel.md#_snippet_2

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import vercelBlobDriver from "unstorage/drivers/vercel-blob";

const storage = createStorage({
  driver: vercelBlobDriver({
    access: "public", // Required! Beware that stored data is publicly accessible.
    // token: "<your secret token>", // or set BLOB_READ_WRITE_TOKEN
    // base: "unstorage",
    // envPrefix: "BLOB",
  }),
});
```

----------------------------------------

TITLE: Initialize Unstorage with Vercel KV Driver (JavaScript)
DESCRIPTION: This snippet shows how to create an `unstorage` instance configured to use the `vercel-kv` driver. It requires `@vercel/kv` to be installed. Optional configuration options like `url`, `token`, `base`, `env`, and `ttl` can be passed to the driver function.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/vercel.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

const storage = createStorage({
  driver: vercelKVDriver({
    // url: "https://<your-project-slug>.kv.vercel-storage.com", // KV_REST_API_URL
    // token: "<your secret token>", // KV_REST_API_TOKEN
    // base: "test",
    // env: "KV",
    // ttl: 60, // in seconds
  }),
});
```

----------------------------------------

TITLE: Watch Storage Changes - unstorage - JavaScript
DESCRIPTION: Demonstrates how to start watching for changes across all mounted drivers using `watch`. It takes a callback function that receives the event type and the affected key. The function returns an `unwatch` function to stop the listener.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_12

LANGUAGE: JavaScript
CODE:
```
const unwatch = await storage.watch((event, key) => {});
// to stop this watcher
await unwatch();
```

----------------------------------------

TITLE: Initializing Unstorage with Azure Blob Storage Driver (JS)
DESCRIPTION: This snippet demonstrates how to initialize Unstorage using the Azure Blob Storage driver. It depends on `@azure/storage-blob` and `@azure/identity`. The driver stores each Unstorage key-value pair as a separate blob within a single container, using the key as the blob name. Key options include `accountName` and `containerName`. Authentication options include `DefaultAzureCredential`, `AzureNamedKeyCredential`, `AzureSASCredential`, or a connection string.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/azure.md#_snippet_3

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import azureStorageBlobDriver from "unstorage/drivers/azure-storage-blob";

const storage = createStorage({
  driver: azureStorageBlobDriver({
    accountName: "myazurestorageaccount",
  }),
});
```

----------------------------------------

TITLE: Configuring db0 Driver for unstorage in JavaScript
DESCRIPTION: This snippet demonstrates the basic configuration for the unstorage db0 driver in JavaScript. It requires importing necessary modules from 'db0' and 'unstorage', creating a 'db0' database instance with a chosen connector (like 'better-sqlite3'), and then passing this instance to the 'dbDriver' function when initializing unstorage.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/database.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createDatabase } from "db0";
import { createStorage } from "unstorage";
import dbDriver from "unstorage/drivers/db0";
import sqlite from "db0/connectors/better-sqlite3";

// Learn more: https://db0.unjs.io
const database = createDatabase(
  sqlite({
    /* db0 connector options */
  })
);

const storage = createStorage({
  driver: dbDriver({
    database,
    table: "custom_table_name", // Default is "unstorage"
  }),
});
```

----------------------------------------

TITLE: Stop Watching Storage - unstorage - JavaScript
DESCRIPTION: Shows how to stop all currently active watchers on all mountpoints using `unwatch`. This cleans up resources associated with watching.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_13

LANGUAGE: JavaScript
CODE:
```
await storage.unwatch();
```

----------------------------------------

TITLE: Connecting to Unstorage HTTP Server (TypeScript)
DESCRIPTION: This snippet shows how to create an unstorage client that connects to a remote HTTP server. It uses the `http` driver, configured with the server's base URL, to interact with the storage instance exposed by the server.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/3.http-server.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { createStorage } from "unstorage";
import httpDriver from "unstorage/drivers/http";

const client = createStorage({
  driver: httpDriver({
    base: "SERVER_ENDPOINT",
  }),
});
const keys = await client.getKeys();
```

----------------------------------------

TITLE: Initializing Unstorage with Netlify Blobs Driver (Deploy Scoped) - JavaScript
DESCRIPTION: This example shows how to configure the `netlify-blobs` driver for a deploy-scoped store. Deploy-scoped stores are tied to a specific deploy, suitable for builds and isolated environments. This configuration does not require a store name.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/netlify.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
import { createStorage } from "unstorage";
import netlifyBlobsDriver from "unstorage/drivers/netlify-blobs";

const storage = createStorage({
  driver: netlifyBlobsDriver({
    deployScoped: true,
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Cloudflare KV Binding Driver (JS)
DESCRIPTION: This snippet shows various ways to configure the `cloudflare-kv-binding` driver within a Cloudflare Worker environment. It covers accessing the binding by name string, via `globalThis`, and using `this.env` in module syntax workers or Durable Objects. This driver is intended for use directly inside a Cloudflare Worker and requires a KV namespace binding.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/cloudflare.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";

// Directly setting binding
const storage = createStorage({
  driver: cloudflareKVBindingDriver({ binding: "STORAGE" }),
});

// Using binding name to be picked from globalThis
const storage = createStorage({
  driver: cloudflareKVBindingDriver({ binding: globalThis.STORAGE }),
});

// Using from Durable Objects and Workers using Modules Syntax
const storage = createStorage({
  driver: cloudflareKVBindingDriver({ binding: this.env.STORAGE }),
});

// Using outside of Cloudflare Workers (like Node.js)
// Use cloudflare-kv-http
```

----------------------------------------

TITLE: Initializing Unstorage with Cloudflare R2 Binding Driver (JS)
DESCRIPTION: This snippet provides examples for initializing `unstorage` using the `cloudflare-r2-binding` driver. It shows how to pass the R2 bucket binding by name string, `globalThis`, or `this.env` within a Cloudflare Worker. This experimental driver is designed specifically for the Cloudflare Worker runtime environment and requires an R2 bucket binding.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/cloudflare.md#_snippet_2

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import cloudflareR2BindingDriver from "unstorage/drivers/cloudflare-r2-binding";

// Using binding name to be picked from globalThis
const storage = createStorage({
  driver: cloudflareR2BindingDriver({ binding: "BUCKET" }),
});

// Directly setting binding
const storage = createStorage({
  driver: cloudflareR2BindingDriver({ binding: globalThis.BUCKET }),
});

// Using from Durable Objects and Workers using Modules Syntax
const storage = createStorage({
  driver: cloudflareR2BindingDriver({ binding: this.env.BUCKET }),
});
```

----------------------------------------

TITLE: Initializing unstorage with FS Driver (JavaScript)
DESCRIPTION: This snippet shows how to initialize an unstorage instance configured to use the standard filesystem (`fs`) driver. It requires importing `createStorage` from `unstorage` and the `fsDriver`. The driver is configured with a `base` directory option which specifies the root directory for storage operations. This driver supports watching using chokidar.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/fs.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({
  driver: fsDriver({ base: "./tmp" }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Cloudflare KV HTTP Driver (JS)
DESCRIPTION: These examples illustrate how to initialize the `cloudflare-kv-http` driver for `unstorage`, which interacts with Cloudflare KV via the API using standard `fetch`. It shows configurations using an API token, email/API key pair, or a user service key, requiring `accountId` and `namespaceId`. This driver is suitable for environments outside of Cloudflare Workers, like Node.js.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/cloudflare.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import cloudflareKVHTTPDriver from "unstorage/drivers/cloudflare-kv-http";

// Using `apiToken`
const storage = createStorage({
  driver: cloudflareKVHTTPDriver({
    accountId: "my-account-id",
    namespaceId: "my-kv-namespace-id",
    apiToken: "supersecret-api-token",
  }),
});

// Using `email` and `apiKey`
const storage = createStorage({
  driver: cloudflareKVHTTPDriver({
    accountId: "my-account-id",
    namespaceId: "my-kv-namespace-id",
    email: "me@example.com",
    apiKey: "my-api-key",
  }),
});

// Using `userServiceKey`
const storage = createStorage({
  driver: cloudflareKVHTTPDriver({
    accountId: "my-account-id",
    namespaceId: "my-kv-namespace-id",
    userServiceKey: "v1.0-my-service-key",
  }),
});
```

----------------------------------------

TITLE: Initializing unstorage with FS-Lite Driver (JavaScript)
DESCRIPTION: This snippet shows how to initialize an unstorage instance configured to use the filesystem-lite (`fs-lite`) driver. It requires importing `createStorage` from `unstorage` and the `fsLiteDriver`. This driver uses pure Node.js APIs without extra dependencies. The driver is configured with a `base` directory option which specifies the root directory for storage operations.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/fs.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

const storage = createStorage({
  driver: fsLiteDriver({ base: "./tmp" }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Azure App Configuration Driver (JS)
DESCRIPTION: This snippet demonstrates how to initialize an Unstorage instance using the Azure App Configuration driver. It requires installing `@azure/app-configuration` and `@azure/identity`. The driver uses the Azure App Configuration store as a key-value store, mapping Unstorage keys to configuration keys and values to configuration values. It accepts options like `appConfigName`, `label`, and `prefix`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/azure.md#_snippet_0

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import azureAppConfiguration from "unstorage/drivers/azure-app-configuration";

const storage = createStorage({
  driver: azureAppConfiguration({
    appConfigName: "unstoragetest",
    label: "dev",
    prefix: "app01",
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Upstash Driver (JavaScript)
DESCRIPTION: This snippet demonstrates how to create and configure an unstorage instance using the upstash driver. It shows how to import necessary modules and pass driver options such as a base path for namespacing and connection details (URL and token), which can also be sourced from environment variables.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/upstash.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import upstashDriver from "unstorage/drivers/upstash";

const storage = createStorage({
  driver: upstashDriver({
    base: "unstorage",
    // url: "", // or set UPSTASH_REDIS_REST_URL env
    // token: "", // or set UPSTASH_REDIS_REST_TOKEN env
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Deno KV Driver (Deno)
DESCRIPTION: This snippet demonstrates how to create an Unstorage instance using the `deno-kv` driver specifically for use within the Deno runtime. It requires the `unstorage` and `unstorage/drivers/deno-kv` imports and can optionally accept `path` and `base` options for configuration.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/deno.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import denoKVdriver from "unstorage/drivers/deno-kv";

const storage = createStorage({
  driver: denoKVdriver({
    // path: ":memory:",
    // base: "",
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Deno KV Node Driver (Node.js)
DESCRIPTION: This snippet shows how to initialize Unstorage with the `deno-kv-node` driver for use in Node.js environments. It requires the `unstorage` and `unstorage/drivers/deno-kv-node` imports, as well as the `@deno/kv` peer dependency. It supports `path`, `base`, and `openKvOptions` for configuration.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/deno.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import denoKVNodedriver from "unstorage/drivers/deno-kv-node";

const storage = createStorage({
  driver: denoKVNodedriver({
    // path: ":memory:",
    // base: "",
  }),
});
```

----------------------------------------

TITLE: Initializing Overlay Storage Driver JavaScript
DESCRIPTION: This snippet initializes an unstorage instance configured with the overlay driver. It stacks a memory driver on top of an fs driver pointing to ./data, allowing write operations to only affect the in-memory layer while reads access both.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/overlay.md#_snippet_0

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import overlay from "unstorage/drivers/overlay";
import memory from "unstorage/drivers/memory";
import fs from "unstorage/drivers/fs";

const storage = createStorage({
  driver: overlay({
    layers: [memory(), fs({ base: "./data" })],
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with UploadThing Driver - JavaScript
DESCRIPTION: Initializes an unstorage instance configured to use the UploadThing driver. This requires importing `createStorage` from 'unstorage' and the `uploadthingDriver` from 'unstorage/drivers/uploadthing'. The driver can optionally be configured with an API `token` in the options object; if not provided, it defaults to the `UPLOADTHING_SECRET` environment variable.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/uploadthing.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import uploadthingDriver from "unstorage/drivers/uploadthing";

const storage = createStorage({
  driver: uploadthingDriver({
    // token: "<your token>", // UPLOADTHING_SECRET environment variable will be used if not provided.
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Capacitor Preferences Driver (JavaScript)
DESCRIPTION: This snippet demonstrates how to initialize an unstorage instance using the `capacitor-preferences` driver. It requires installing the `@capacitor/preferences` package and syncing Capacitor. The `base` option is used to prefix all keys, preventing potential collisions.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/capacitor-preferences.md#_snippet_0

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import capacitorPreferences from "unstorage/drivers/capacitor-preferences";

const storage = createStorage({
  driver: capacitorPreferences({
    base: "test",
  }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with IndexedDB Driver (JavaScript)
DESCRIPTION: This snippet shows how to create a storage instance configured to use the indexeddb driver from the unstorage library. It requires installing the 'idb-keyval' dependency. The code imports the required functions and initializes the storage with the indexedDbDriver, optionally providing a base key option.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/browser.md#_snippet_1

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexeddb";

const storage = createStorage({
  driver: indexedDbDriver({ base: "app:" }),
});
```

----------------------------------------

TITLE: Initializing Unstorage with Azure Cosmos DB Driver (JS)
DESCRIPTION: This snippet shows how to configure Unstorage to use Azure Cosmos DB (NoSQL API) as the storage backend. It requires the `@azure/cosmos` and `@azure/identity` packages. The driver stores KV pairs as documents, using the Unstorage key as the document `id`. Essential options include the `endpoint` and authentication via `accountKey` or `DefaultAzureCredential`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/azure.md#_snippet_1

LANGUAGE: js
CODE:
```
import { createStorage } from "unstorage";
import azureCosmos from "unstorage/drivers/azure-cosmos";

const storage = createStorage({
  driver: azureCosmos({
    endpoint: "ENDPOINT",
    accountKey: "ACCOUNT_KEY",
  }),
});
```

----------------------------------------

TITLE: Taking Storage Snapshot with snapshot (JavaScript)
DESCRIPTION: This code shows how to use the `snapshot` utility function. It takes a storage instance and an optional base path. It reads all keys within the specified base and returns their content as a plain JavaScript object, effectively creating a snapshot of that part of the storage.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/2.utils.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { snapshot } from "unstorage";

const data = await snapshot(storage, "/etc");
```

----------------------------------------

TITLE: Get Metadata - unstorage - JavaScript
DESCRIPTION: Shows how to fetch metadata associated with a specific key using `getMeta`. Metadata can come from the driver's native capabilities (like file timestamps) or custom metadata set via `setMeta`.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/1.guide/1.index.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
await storage.getMeta("foo:bar"); // For fs driver returns an object like { mtime, atime, size }
```

----------------------------------------

TITLE: Initializing unstorage with Azure Table Storage Driver - JavaScript
DESCRIPTION: This code snippet demonstrates how to initialize an unstorage instance using the `azure-storage-table` driver. It imports the necessary functions and sets up the driver by providing the required `accountName` option. Dependencies include the `unstorage` library and the driver itself, along with Azure SDK packages (`@azure/data-table`, `@azure/identity`) for runtime.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/azure.md#_snippet_4

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import azureStorageTableDriver from "unstorage/drivers/azure-storage-table";

const storage = createStorage({
  driver: azureStorageTableDriver({
    accountName: "myazurestorageaccount",
  }),
});
```

----------------------------------------

TITLE: Configuring unstorage with PlanetScale Driver
DESCRIPTION: This JavaScript snippet demonstrates how to initialize unstorage using the `planetscale` driver. It requires importing `createStorage` and `planetscaleDriver`. The essential configuration option is the `url` connecting to your PlanetScale database, which should ideally be loaded from environment variables or runtime configuration for security.
SOURCE: https://github.com/unjs/unstorage/blob/main/docs/2.drivers/planetscale.md#_snippet_2

LANGUAGE: javascript
CODE:
```
import { createStorage } from "unstorage";
import planetscaleDriver from "unstorage/drivers/planetscale";

const storage = createStorage({
  driver: planetscaleDriver({
    // This should certainly not be inlined in your code but loaded via runtime config
    // or environment variables depending on your framework/project.
    url: "mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my-database?sslaccept=strict",
    // table: 'storage'
  }),
});
```
