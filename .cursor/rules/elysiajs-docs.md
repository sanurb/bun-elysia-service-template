TITLE: Configuring Global Error Handling in ElysiaJS (TypeScript)
DESCRIPTION: This main application file initializes Elysia, integrates Swagger documentation, and includes the previously defined `user` and `note` plugins using `.use()`. Crucially, it demonstrates global error handling by attaching an `onError` listener that logs errors to the console but specifically ignores 'NOT_FOUND' errors, showing how to intercept and process errors thrown within the application lifecycle.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_44

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { note } from './note'
import { user } from './user'

const app = new Elysia()
    .use(swagger())
    .onError(({ error, code }) => { 
        if (code === 'NOT_FOUND') return 

        console.error(error) 
    }) 
    .use(user)
    .use(note)
    .listen(3000)
```

----------------------------------------

TITLE: Accessing Context in ElysiaJS Handlers
DESCRIPTION: Illustrates how to access the context object in an ElysiaJS route handler, which contains request-specific information.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/essential/handler.md#2025-04-23_snippet_2

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
	.get('/', (context) => context.path)
            // ^ This is a context
```

----------------------------------------

TITLE: Path Parameter Handling
DESCRIPTION: Shows how to use dynamic path parameters and rest parameters in routes
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/integrations/cheat-sheet.md#2025-04-23_snippet_2

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    .get('/id/:id', ({ params: { id } }) => id)
    .get('/rest/*', () => 'Rest')
    .listen(3000)
```

----------------------------------------

TITLE: Basic ElysiaJS Server Setup
DESCRIPTION: Minimal TypeScript code to create an Elysia server with a single GET route.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/quick-start.md#2025-04-23_snippet_1

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

const app = new Elysia()
	.get('/', () => 'Hello Elysia')
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
```

----------------------------------------

TITLE: Basic Hello World Server in Elysia
DESCRIPTION: Creates a simple HTTP server that responds with 'Hello World' on the root path
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/integrations/cheat-sheet.md#2025-04-23_snippet_0

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    .get('/', () => 'Hello World')
    .listen(3000)
```

----------------------------------------

TITLE: Using Eden Treaty Client with Elysia Server (TypeScript)
DESCRIPTION: Demonstrates how to set up an Elysia server with defined types and connect to it from a client using `treaty` from `@elysiajs/eden` for end-to-end type safety, including auto-completion and type-safe error handling.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/eden/overview.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
// @filename: server.ts
import { Elysia, t } from 'elysia'

const app = new Elysia()
    .get('/', 'hi')
    .get('/users', () => 'Skadi')
    .put('/nendoroid/:id', ({ body }) => body, {
        body: t.Object({
            name: t.String(),
            from: t.String()
        })
    })
    .get('/nendoroid/:id/name', () => 'Skadi')
    .listen(3000)

export type App = typeof app

// @filename: index.ts
// ---cut---
import { treaty } from '@elysiajs/eden'
import type { App } from './server'

const app = treaty<App>('localhost:3000')

// @noErrors
app.
//  ^|




// Call [GET] at '/'
const { data } = await app.get()

// Call [PUT] at '/nendoroid/:id'
const { data: nendoroid, error } = await app.nendoroid({ id: 1895 }).put({
    name: 'Skadi',
    from: 'Arknights'
})
```

----------------------------------------

TITLE: Implement Note Service (ElysiaJS)
DESCRIPTION: Defines a complete ElysiaJS service for managing notes, including a Note class for data handling, type definitions, middleware for logging and user authentication, and routes for CRUD operations (GET, PUT, DELETE, PATCH). It demonstrates using plugins (`.use`), decorators (`.decorate`), models (`.model`), lifecycle events (`.onTransform`), and route guards (`.guard`).
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_41

LANGUAGE: TypeScript
CODE:
```
import { Elysia, t } from 'elysia'
import { getUserId, userService } from './user' // [!code ++]

const memo = t.Object({
	data: t.String(),
	author: t.String()
})

type Memo = typeof memo.static

class Note {
    constructor(
		public data: Memo[] = [
			{
				data: 'Moonhalo',
				author: 'saltyaom'
			}
		]
	) {}

    add(note: Memo) {
        this.data.push(note)

        return this.data
    }

    remove(index: number) {
        return this.data.splice(index, 1)
    }

    update(index: number, note: Partial<Memo>) {
        return (this.data[index] = { ...this.data[index], ...note })
    }
}

export const note = new Elysia({ prefix: '/note' })
	.use(userService) // [!code ++]
    .decorate('note', new Note())
    .model({
        memo: t.Omit(memo, ['author'])
    })
    .onTransform(function log({ body, params, path, request: { method } }) {
        console.log(`${method} ${path}`, {
            body,
            params
        })
    })
    .get('/', ({ note }) => note.data)
    .use(getUserId) // [!code ++]
    .put(
        '/',
        ({ note, body: { data }, username }) =>
            note.add({ data, author: username }),
        {
            body: 'memo'
        }
    )
    .get(
        '/:index',
        ({ note, params: { index }, error }) => {
            return note.data[index] ?? error(404, 'Not Found :(')
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .guard({
        params: t.Object({
            index: t.Number()
        })
    })
    .delete('/:index', ({ note, params: { index }, error }) => {
        if (index in note.data) return note.remove(index)

        return error(422)
    })
    .patch(
        '/:index',
        ({ note, params: { index }, body: { data }, error, username }) => {
            if (index in note.data)
                return note.update(index, { data, author: username })

            return error(422)
        },
        {
            isSignIn: true,
            body: 'memo'
        }
    )
```

----------------------------------------

TITLE: Updating Note Service with Memo Schema and Authorization - TypeScript
DESCRIPTION: Defines a `Memo` schema and type using Elysia's `t` for runtime validation and type inference. Updates the `Note` class constructor and methods (`add`, `update`) to manage `Memo` objects. Configures an Elysia instance (`note`) to use the updated `Note` class, define a model based on `Memo`, log requests, and handle routes (`/`, `/:index`) with updated body parsing and authorization logic to include the author.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_38

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'

const memo = t.Object({
	data: t.String(),
	author: t.String()
})

type Memo = typeof memo.static

class Note {
    constructor(
		public data: Memo[] = [
			{
				data: 'Moonhalo',
				author: 'saltyaom'
			}
		]
	) {}

    add(note: Memo) {
        this.data.push(note)

        return this.data
    }

    remove(index: number) {
        return this.data.splice(index, 1)
    }

    update(index: number, note: Partial<Memo>) {
        return (this.data[index] = { ...this.data[index], ...note })
    }
}

export const note = new Elysia({ prefix: '/note' })
    .decorate('note', new Note())
    .model({
    	memo: t.Omit(memo, ['author'])
    })
    .onTransform(function log({ body, params, path, request: { method } }) {
        console.log(`${method} ${path}`, {
            body,
            params
        })
    })
    .get('/', ({ note }) => note.data)
    .put('/', ({ note, body: { data }, username }) =>
    	note.add({ data, author: username }),
     	{
     		body: 'memo'
      	}
    )
    .guard({
        params: t.Object({
            index: t.Number()
        })
    })
    .get(
        '/:index',
        ({ note, params: { index }, error }) => {
            return note.data[index] ?? error(404, 'Not Found :(')
        }
    )
    .delete(
        '/:index',
        ({ note, params: { index }, error }) => {
            if (index in note.data) return note.remove(index)

            return error(422)
        }
    )
    .patch(
        '/:index',
        ({ note, params: { index }, body: { data }, error, username }) => {
        	if (index in note.data)
         		return note.update(index, { data, author: username }))

            return error(422)
        },
        {
            body: 'memo'
        }
    )
```

----------------------------------------

TITLE: Define User Authentication Schemas with Elysia t
DESCRIPTION: Defines the schema for user authentication, including password requirements, session cookie structure with secrets, and an optional session reference using Elysia's `t` (TypeBox) module.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_57

LANGUAGE: TypeScript
CODE:
```
password: t.String({ minLength: 8 })
        }),
        session: t.Cookie(
            {
                token: t.Number()
            },
            {
                secrets: 'seia'
            }
        ),
        optionalSession: t.Optional(t.Ref('session'))
    })
```

----------------------------------------

TITLE: Type Inference in ElysiaJS
DESCRIPTION: This snippet illustrates type inference in ElysiaJS. It shows how to use inline functions and schema validation to achieve accurate type inference for request bodies.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/key-concept.md#2025-04-23_snippet_4

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'

const app = new Elysia()
	.post('/', ({ body }) => body, {
		body: t.Object({
			name: t.String()
		})
	})
```

----------------------------------------

TITLE: Defining Elysia Server and Exporting Type for Eden Treaty (TypeScript)
DESCRIPTION: This snippet defines a basic Elysia server with GET and POST routes, including body validation using `t`. The crucial step for Eden Treaty is exporting the server's type (`App = typeof app`), which provides the necessary type information for client-side type safety.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/eden/treaty/overview.md#_snippet_0

LANGUAGE: typescript
CODE:
```
// server.ts
import { Elysia, t } from 'elysia'

const app = new Elysia()
    .get('/hi', () => 'Hi Elysia')
    .get('/id/:id', ({ params: { id } }) => id)
    .post('/mirror', ({ body }) => body, {
        body: t.Object({
            id: t.Number(),
            name: t.String()
        })
    })
    .listen(3000)

export type App = typeof app // [!code ++]
```

----------------------------------------

TITLE: Implementing CRUD Routes in ElysiaJS
DESCRIPTION: This snippet defines a simple Note class to manage an array of strings and creates an Elysia plugin that exposes CRUD operations (GET, PUT, GET by index, DELETE by index, PATCH by index) via HTTP routes. It demonstrates basic route handling, body parsing, parameter extraction, and error handling.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_16

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['Moonhalo']) {}

    add(note: string) {
        this.data.push(note)

        return this.data
    }

    remove(index: number) {
        return this.data.splice(index, 1)
    }

    update(index: number, note: string) {
        return (this.data[index] = note)
    }
}

export const note = new Elysia()
    .decorate('note', new Note())
    .get('/note', ({ note }) => note.data)
    .put('/note', ({ note, body: { data } }) => note.add(data), {
        body: t.Object({
            data: t.String()
        })
    })
    .get(
        '/note/:index',
        ({ note, params: { index }, error }) => {
            return note.data[index] ?? error(404, 'Not Found :(')
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .delete(
        '/note/:index',
        ({ note, params: { index }, error }) => {
            if (index in note.data) return note.remove(index)

            return error(422)
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .patch(
        '/note/:index',
        ({ note, params: { index }, body: { data }, error }) => {
            if (index in note.data) return note.update(index, data)

            return error(422)
        },
        {
            params: t.Object({
                index: t.Number()
            }),
            body: t.Object({
                data: t.String()
            })
        }
    )
```

----------------------------------------

TITLE: Elysia Reusable User ID Resolver (TypeScript)
DESCRIPTION: Defines an Elysia instance `getUserId` that acts as reusable middleware. It uses a `userService`, applies a guard requiring sign-in and a 'session' cookie, and resolves the authenticated username from the session store based on the cookie value.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_46

LANGUAGE: TypeScript
CODE:
```
export const getUserId = new Elysia()
    .use(userService)
    .guard({
    	isSignIn: true,
        cookie: 'session'
    })
    .resolve(
    	({ store: { session }, cookie: { token } }) => ({
    	   	username: session[token.value]
    	})
    )
    .as('scoped')
```

----------------------------------------

TITLE: Creating a Basic Handler in ElysiaJS
DESCRIPTION: Demonstrates how to create a simple GET route handler in ElysiaJS that returns a 'hello world' response.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/essential/handler.md#2025-04-23_snippet_0

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    // the function `() => 'hello world'` is a handler
    .get('/', () => 'hello world')
    .listen(3000)
```

----------------------------------------

TITLE: Add GET Route in Elysia
DESCRIPTION: Demonstrates how to add a new GET route /hello to the Elysia application instance. The route is defined with a path and a simple string response.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_4

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

const app = new Elysia()
    .get('/', () => 'Hello Elysia')
    .get('/hello', 'Do you miss me?') // [!code ++]
    .listen(3000)
```

----------------------------------------

TITLE: Unit Testing with Eden Treaty 2
DESCRIPTION: Demonstrates how to use Eden Treaty 2 for end-to-end type-safe unit testing of Elysia applications without starting a mock server.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/blog/elysia-10.md#2025-04-23_snippet_3

LANGUAGE: typescript
CODE:
```
// test/index.test.ts
import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'
import { treaty } from '@elysiajs/eden'

const app = new Elysia().get('/hello', () => 'hi')
const api = treaty(app)

describe('Elysia', () => {
    it('return a response', async () => {
        const { data } = await api.hello.get()

        expect(data).toBe('hi')
    })
})
```

----------------------------------------

TITLE: End-to-End Type Safety with Elysia and Eden
DESCRIPTION: Demonstrates end-to-end type safety between Elysia server and client using @elysiajs/eden. Shows type inference for API calls and response data.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/index.md#2025-04-23_snippet_6

LANGUAGE: typescript
CODE:
```
// @filename: server.ts
import { Elysia, t } from 'elysia'

const app = new Elysia()
    .patch(
        '/profile',
        ({ body, error }) => {
            if(body.age < 18)
                return error(400, "Oh no")

            return body
        },
        {
            body: t.Object({
                age: t.Number()
            })
        }
    )
    .listen(80)

export type App = typeof app

// @filename: client.ts
// ---cut---
import { treaty } from '@elysiajs/eden'
import type { App } from './server'

const api = treaty<App>('api.elysiajs.com')

const { data } = await api.profile.patch({
      // ^?
    age: 21
})
```

----------------------------------------

TITLE: Implementing User Service and Authorization Resolver - TypeScript
DESCRIPTION: Defines an Elysia instance (`userService`) for managing user state and sessions, including models for sign-in and session cookies. Implements a `isSignIn` macro for authorization checks based on session tokens. Defines another Elysia instance (`getUserId`) that uses `userService` and a guard to resolve the authenticated user's username from the session token. Defines a `user` Elysia instance that uses `getUserId`.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_39

LANGUAGE: typescript
CODE:
```
// @errors: 2392 2300 2403 2345 2698, 2538
// @filename: user.ts
import { Elysia, t } from 'elysia'

export const userService = new Elysia({ name: 'user/service' })
    .state({
        user: {} as Record<string, string>,
        session: {} as Record<number, string>
    })
    .model({
        signIn: t.Object({
            username: t.String({ minLength: 1 }),
            password: t.String({ minLength: 8 })
        }),
        session: t.Cookie(
            {
                token: t.Number()
            },
            {
                secrets: 'seia'
            }
        ),
        optionalSession: t.Optional(t.Ref('session'))
    })
    .macro({
        isSignIn(enabled: boolean) {
            if (!enabled) return

            return {
            	beforeHandle({ error, cookie: { token }, store: { session } }) {
                    if (!token.value)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })

                    const username = session[token.value as unknown as number]

                    if (!username)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })
                }
            }
        }
    })

export const getUserId = new Elysia()
    .use(userService)
    .guard({
    	isSignIn: true,
        cookie: 'session'
    })
    .resolve(
    	({ store: { session }, cookie: { token } }) => ({
    	   	username: session[token.value]
    	})
    )
    .as('scoped')

export const user = new Elysia({ prefix: '/user' })
	.use(getUserId)
```

----------------------------------------

TITLE: Creating a Basic Elysia Server
DESCRIPTION: A simple hello world example in Elysia that sets up three routes - a root GET route, a parameterized user route, and a POST route for form submissions.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/at-glance.md#2025-04-23_snippet_0

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    .get('/', 'Hello Elysia')
    .get('/user/:id', ({ params: { id }}) => id)
    .post('/form', ({ body }) => body)
    .listen(3000)
```

----------------------------------------

TITLE: Defining User Service and Routes in Elysia (TypeScript)
DESCRIPTION: Creates an Elysia service (userService) managing user state and sessions. It defines models for sign-in and session cookies, including secrets. A macro (isSignIn) is implemented for authentication checks. It also sets up user-related routes (/user) for sign-up, sign-in, sign-out, and profile retrieval, utilizing the service, models, and macro.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_56

LANGUAGE: TypeScript
CODE:
```
import { Elysia, t } from 'elysia'

export const userService = new Elysia({ name: 'user/service' })
    .state({
        user: {} as Record<string, string>,
        session: {} as Record<number, string>
    })
    .model({
        signIn: t.Object({
            username: t.String({ minLength: 1 }),
            password: t.String({ minLength: 8 })
        }),
        session: t.Cookie(
            {
                token: t.Number()
            },
            {
                secrets: 'seia'
            }
        ),
        optionalSession: t.Optional(t.Ref('session'))
    })
    .macro({
        isSignIn(enabled: boolean) {
            if (!enabled) return

            return {
            	beforeHandle({ error, cookie: { token }, store: { session } }) {
                    if (!token.value)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })

                    const username = session[token.value as unknown as number]

                    if (!username)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })
                }
            }
        }
    })

export const getUserId = new Elysia()
    .use(userService)
    .guard({
    	isSignIn: true,
        cookie: 'session'
    })
    .resolve(({ store: { session }, cookie: { token } }) => ({
        username: session[token.value]
    }))
    .as('scoped')

export const user = new Elysia({ prefix: '/user' })
    .use(userService)
    .put(
        '/sign-up',
        async ({ body: { username, password }, store, error }) => {
            if (store.user[username])
                return error(400, {
                    success: false,
                    message: 'User already exists'
                })

            store.user[username] = await Bun.password.hash(password)

            return {
                success: true,
                message: 'User created'
            }
        },
        {
            body: 'signIn'
        }
    )
    .post(
        '/sign-in',
        async ({
            store: { user, session },
            error,
            body: { username, password },
            cookie: { token }
        }) => {
            if (
                !user[username] ||
                !(await Bun.password.verify(password, user[username]))
            )
                return error(400, {
                    success: false,
                    message: 'Invalid username or password'
                })

            const key = crypto.getRandomValues(new Uint32Array(1))[0]
            session[key] = username
            token.value = key

            return {
                success: true,
                message: `Signed in as ${username}`
            }
        },
        {
            body: 'signIn',
            cookie: 'optionalSession'
        }
    )
    .get(
        '/sign-out',
        ({ cookie: { token } }) => {
            token.remove()

            return {
                success: true,
                message: 'Signed out'
            }
        },
        {
            cookie: 'optionalSession'
        }
    )
    .use(getUserId)
    .get('/profile', ({ username }) => ({
        success: true,
        username
    }))
```

----------------------------------------

TITLE: Applying Scoped Lifecycle Properties in Elysia.js (TypeScript)
DESCRIPTION: This snippet demonstrates how to explicitly apply lifecycle properties from a plugin to its immediate parent using the `as: 'scoped'` option in `.guard()` and `.resolve()`. By marking the guard and resolve as 'scoped', the `username` property derived in the `getUserId` plugin becomes available in the context of the parent `user` application's route handlers, allowing access to the authenticated username.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_30

LANGUAGE: TypeScript
CODE:
```
// @errors: 2538
import { Elysia, t } from 'elysia'

export const userService = new Elysia({ name: 'user/service' })
    .state({
        user: {} as Record<string, string>,
        session: {} as Record<number, string>
    })
    .model({
        signIn: t.Object({
            username: t.String({ minLength: 1 }),
            password: t.String({ minLength: 8 })
        }),
        session: t.Cookie(
            {
                token: t.Number()
            },
            {
                secrets: 'seia'
            }
        ),
        optionalSession: t.Optional(t.Ref('session'))
    })
    .macro({
        isSignIn(enabled: boolean) {
            if (!enabled) return

            return {
            	beforeHandle({ error, cookie: { token }, store: { session } }) {
                    if (!token.value)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })

                    const username = session[token.value as unknown as number]

                    if (!username)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })
                }
            }
        }
    })
// ---cut---
export const getUserId = new Elysia()
    .use(userService)
    .guard({
    	as: 'scoped', // [!code ++]
    	isSignIn: true,
        cookie: 'session'
    })
    .resolve(
    	{ as: 'scoped' }, // [!code ++]
     	({ store: { session }, cookie: { token } }) => ({
        	username: session[token.value]
      	})
    )

export const user = new Elysia({ prefix: '/user' })
	.use(getUserId)
	.get('/profile', ({ username }) => ({
		                 // ^?
        success: true,
        username
    }))
```

----------------------------------------

TITLE: Defining Basic GET Routes - ElysiaJS (TypeScript)
DESCRIPTION: This snippet demonstrates how to define basic GET routes in ElysiaJS for the root path ('/') and '/hi'. It shows the use of the `.get()` method with a path and a simple string response, followed by `.listen()` to start the server on port 3000.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/essential/route.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    .get('/', 'hello')
    .get('/hi', 'hi')
    .listen(3000)
```

----------------------------------------

TITLE: Elysia Resolve: Extracting User ID from Session
DESCRIPTION: Demonstrates using Elysia's `resolve` feature to create a new context property (`username`) by accessing the session store with the token from the cookie. This allows extracting user information based on request data before the main handler executes.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_28

LANGUAGE: TypeScript
CODE:
```
export const getUserId = new Elysia() // [!code ++]
    .use(userService) // [!code ++]
    .guard({ // [!code ++]
        cookie: 'session' // [!code ++]
    }) // [!code ++]
    .resolve(({ store: { session }, cookie: { token } }) => ({ // [!code ++]
        username: session[token.value] // [!code ++]
    })) // [!code ++]
```

----------------------------------------

TITLE: Unit Testing Setup
DESCRIPTION: Demonstrates how to write unit tests for Elysia applications
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/integrations/cheat-sheet.md#2025-04-23_snippet_16

LANGUAGE: typescript
CODE:
```
import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'

describe('Elysia', () => {
    it('return a response', async () => {
        const app = new Elysia().get('/', () => 'hi')

        const response = await app
            .handle(new Request('http://localhost/'))
            .then((res) => res.text())

        expect(response).toBe('hi')
    })
})
```

----------------------------------------

TITLE: Creating a Unit Test with Eden Treaty in TypeScript
DESCRIPTION: This snippet demonstrates how to set up a unit test for an Elysia application using Eden Treaty. It creates a simple Elysia server with a GET endpoint, initializes the Eden Treaty client with the server instance, and tests that the endpoint returns the expected response. This approach provides end-to-end type safety without sending actual network requests.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/eden/treaty/unit-test.md#2025-04-23_snippet_0

LANGUAGE: typescript
CODE:
```
// test/index.test.ts
import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'
import { treaty } from '@elysiajs/eden'

const app = new Elysia().get('/hello', 'hi')
const api = treaty(app)

describe('Elysia', () => {
    it('return a response', async () => {
        const { data } = await api.hello.get()

        expect(data).toBe('hi')
              // ^?

    })
})
```

----------------------------------------

TITLE: Creating Unit Tests for ElysiaJS using Bun Test Runner
DESCRIPTION: This code snippet demonstrates how to create a basic unit test for an ElysiaJS application using Bun's built-in test runner. It tests a simple GET request to the root endpoint.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/patterns/unit-test.md#2025-04-23_snippet_0

LANGUAGE: typescript
CODE:
```
// test/index.test.ts
import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'

describe('Elysia', () => {
    it('return a response', async () => {
        const app = new Elysia().get('/', () => 'hi')

        const response = await app
            .handle(new Request('http://localhost/'))
            .then((res) => res.text())

        expect(response).toBe('hi')
    })
})
```

----------------------------------------

TITLE: Context Extension in Elysia
DESCRIPTION: Demonstrates various methods for extending Elysia's context including state, decorate, derive, and resolve.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/essential/handler.md#2025-04-23_snippet_14

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    .state('version', 1)
    .get('/a', ({ store: { version } }) => version)
    .get('/b', ({ store }) => store)
    .get('/c', () => 'still ok')
    .listen(3000)
```

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

class Logger {
    log(value: string) {
        console.log(value)
    }
}

new Elysia()
    .decorate('logger', new Logger())
    .get('/', ({ logger }) => {
        logger.log('hi')

        return 'hi'
    })
```

----------------------------------------

TITLE: Basic Routing and WebSocket Handling in Elysia
DESCRIPTION: Demonstrates basic routing, file serving, streaming responses, and WebSocket handling in Elysia. Shows the simplicity of setting up various types of endpoints.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/index.md#2025-04-23_snippet_4

LANGUAGE: typescript
CODE:
```
import { Elysia, file } from 'elysia'

new Elysia()
	.get('/', 'Hello World')
	.get('/image', file('mika.webp'))
	.get('/stream', function* () {
		yield 'Hello'
		yield 'World'
	})
	.ws('/realtime', {
		message(ws, message) {
			ws.send('got:' + message)
		}
	})
	.listen(3000)
```

----------------------------------------

TITLE: Creating Public and Protected Post Routes Using Elysia (TypeScript)
DESCRIPTION: This code snippet defines both public (read) and protected (write) endpoints for a 'post' resource in an Elysia server. The public GET endpoint retrieves a post by its ID without requiring authentication, providing a success status and data. The protected PUT endpoint (after .use(authen)) allows authenticated users to create posts, validating the input and associating ownership via userId. Required dependencies: Elysia, t (type-safety and validation), Supabase, and the authen plugin. Inputs: GET - post ID via params; PUT - body with 'detail' property. Outputs: GET - {success, data}; PUT - new post ID or throws error on failure. Demonstrates selective scoping of middleware.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/blog/elysia-supabase.md#2025-04-23_snippet_15

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'

import { authen, supabase } from '../../libs'

export const post = (app: Elysia) =>
    app.group('/post', (app) =>
        app
            .get('/:id', async ({ params: { id } }) => { // [!code ++]
                const { data, error } = await supabase // [!code ++]
                    .from('post') // [!code ++]
                    .select() // [!code ++]
                    .eq('id', id) // [!code ++]
 // [!code ++]
                if (error) return error // [!code ++]
 // [!code ++]
                return { // [!code ++]
                    success: !!data[0], // [!code ++]
                    data: data[0] ?? null // [!code ++]
                } // [!code ++]
            }) // [!code ++]
            .use(authen)
            .put(
                '/create',
                async ({ body, userId }) => {
                    const { data, error } = await supabase
                        .from('post')
                        .insert({
                            // Add user_id somehow
                            // user_id: userId,
                            ...body
                        })
                        .select('id')

                    if (error) throw error

                    return data[0]
                },
                {
                    schema: {
                        body: t.Object({
                            detail: t.String()
                        })
                    }
                }
            )
    )
```

----------------------------------------

TITLE: Defining Note Routes in Elysia (TypeScript)
DESCRIPTION: Defines DELETE and PATCH endpoints for managing notes within an Elysia application. It includes parameter validation using t.Number(), checks for note existence, handles errors (422 Unprocessable Entity), and uses a guard (isSignIn) and body parsing (body: 'memo') for the PATCH route.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_54

LANGUAGE: TypeScript
CODE:
```
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .guard({
        params: t.Object({
            index: t.Number()
        })
    })
    .delete('/:index', ({ note, params: { index }, error }) => {
        if (index in note.data) return note.remove(index)

        return error(422)
    })
    .patch(
        '/:index',
        ({ note, params: { index }, body: { data }, error, username }) => {
            if (index in note.data)
                return note.update(index, { data, author: username })

            return error(422)
        },
        {
            isSignIn: true,
            body: 'memo'
        }
    )
```

----------------------------------------

TITLE: Use Elysia.js Plugin (index.ts)
DESCRIPTION: Demonstrates how to import and apply a custom Elysia.js plugin (`note`) to the main application instance (`index.ts`), showing how to modularize routes and decorators.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/tutorial.md#_snippet_15

LANGUAGE: typescript
CODE:
```
// @filename: note.ts
import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['Moonhalo']) {}
}

export const note = new Elysia()
    .decorate('note', new Note())
    .get('/note', ({ note }) => note.data)
    .get(
        '/note/:index',
        ({ note, params: { index }, error }) => {
            return note.data[index] ?? error(404, 'oh no :(')
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )

// @filename: index.ts
// ---cut---
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { note } from './note' // [!code ++]

class Note { // [!code --]
    constructor(public data: string[] = ['Moonhalo']) {} // [!code --]
} // [!code --]

const app = new Elysia()
    .use(swagger())
    .use(note) // [!code ++]
    .decorate('note', new Note()) // [!code --]
    .get('/note', ({ note }) => note.data) // [!code --]
    .get( // [!code --]
        '/note/:index', // [!code --]
        ({ note, params: { index }, error }) => { // [!code --]
            return note.data[index] ?? error(404, 'oh no :(') // [!code --]
        }, // [!code --]
        { // [!code --]
            params: t.Object({ // [!code --]
                index: t.Number() // [!code --]
            }) // [!code --]
        } // [!code --]
    ) // [!code --]
    .listen(3000)
```

----------------------------------------

TITLE: Inline Error Implementation
DESCRIPTION: Demonstrates the new inline error handling with type-safe status codes and responses.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/blog/elysia-10.md#2025-04-23_snippet_9

LANGUAGE: typescript
CODE:
```
import { Elysia } from 'elysia'

new Elysia()
    .get('/hello', ({ error }) => {
        if(Math.random() > 0.5) return error(418, 'Nagisa')

        return 'Azusa'
    }, {
        response: t.Object({
            200: t.Literal('Azusa'),
            418: t.Literal('Nagisa')
        })
    })
```

----------------------------------------

TITLE: Error Handling and Response Validation in Elysia
DESCRIPTION: Demonstrates error handling and response validation in Elysia. Shows how to define expected response types and handle custom error responses.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/index.md#2025-04-23_snippet_2

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'

new Elysia()
	.get('/profile', ({ error }) => {
		if(Math.random() > .5)
			return error(418, 'Mika')

		return 'ok'
	}, {
		response: {
			200: t.Literal('ok'),
			418: t.Literal('Nagisa')
		}
	})
	.listen(3000)
```

----------------------------------------

TITLE: Server-side Setup for End-to-end Type Safety
DESCRIPTION: Shows how to export your Elysia app type to enable end-to-end type safety with frontend clients.
SOURCE: https://github.com/elysiajs/documentation/blob/main/docs/at-glance.md#2025-04-23_snippet_4

LANGUAGE: typescript
CODE:
```
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
    .use(swagger())
    .get('/user/:id', ({ params: { id } }) => id, {
        params: t.Object({
            id: t.Number()
        })
    })
    .listen(3000)

export type App = typeof app
```