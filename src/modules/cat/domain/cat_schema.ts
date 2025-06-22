import { t } from 'elysia';

export const CatSchema = t.Object({
  id: t.String(),
  name: t.String(),
  age: t.Number(),
  breed: t.String(),
});
