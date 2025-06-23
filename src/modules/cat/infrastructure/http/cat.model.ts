import { Elysia, t } from 'elysia';

const CatResponseDTO = t.Object({
  id: t.String(),
  name: t.String(),
  age: t.Number(),
  breed: t.String(),
});

const CatParamsDTO = t.Object({
  id: t.String(),
});

export const catModels = new Elysia({ name: 'models:cat' }).model({
  'cat.response': CatResponseDTO,
  'cat.params': CatParamsDTO,
  'cat.create.body': t.Object({
    name: t.String({ minLength: 2 }),
    age: t.Number({ minimum: 0 }),
    breed: t.String(),
  }),
  'cat.update.body': t.Object({
    name: t.Optional(t.String({ minLength: 2 })),
    age: t.Optional(t.Number({ minimum: 0 })),
    breed: t.Optional(t.String()),
  }),
  'response.error.notfound': t.Object({
    status: t.String(),
    message: t.String(),
  }),
  'response.error.badrequest': t.Object({
    status: t.String(),
    message: t.String(),
  }),
  'response.error.internal': t.Object({
    status: t.String(),
    message: t.String(),
  }),
});
