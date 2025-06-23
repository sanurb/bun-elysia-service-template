import { type Context, Elysia, t } from 'elysia';
import type { CatMapper } from '../../application/mappers/cat_mapper';
import { CreateCatUseCase } from '../../application/use_cases/create/create_cat';
import { DeleteCatUseCase } from '../../application/use_cases/delete/delete_cat';
import {
  CatNotFoundError,
  ValidationError,
} from '../../application/use_cases/errors';
import { GetAllCatsUseCase } from '../../application/use_cases/get_all/get_all_cats';
import { GetCatByIdUseCase } from '../../application/use_cases/get_by_id/get_cat_by_id';
import { UpdateCatUseCase } from '../../application/use_cases/update/update_cat';
import { CatId } from '../../domain/cat_id';
import type { InMemoryCatRepository } from '../in_memory_cat_repository';
import { catModels } from './cat.model';

export const setupCatController = (
  catRepository: InMemoryCatRepository,
  catMapper: typeof CatMapper
) => {
  const createCatUseCase = new CreateCatUseCase(catRepository);
  const getAllCatsUseCase = new GetAllCatsUseCase(catRepository);
  const getCatByIdUseCase = new GetCatByIdUseCase(catRepository);
  const deleteCatUseCase = new DeleteCatUseCase(catRepository);
  const updateCatUseCase = new UpdateCatUseCase(catRepository);

  const handleUseCaseError = (error: Error, set: Context['set']) => {
    if (error instanceof ValidationError) {
      set.status = 400;
      return { status: 'error', message: error.message };
    }
    if (error instanceof CatNotFoundError) {
      set.status = 404;
      return { status: 'error', message: error.message };
    }
    set.status = 500;
    return { status: 'error', message: 'An unexpected error occurred.' };
  };

  return new Elysia({ prefix: '/cats', name: 'controller:cat' })
    .use(catModels)
    .post(
      '/',
      async ({ body, set }) => {
        const result = await createCatUseCase.execute(body);
        if (result.isLeft()) {
          return handleUseCaseError(result.value, set);
        }
        set.status = 201;
        return { status: 'success', message: 'Cat created successfully' };
      },
      {
        body: 'cat.create.body',
        response: {
          201: t.Object({ status: t.String(), message: t.String() }),
          400: 'response.error.badrequest',
          500: 'response.error.internal',
        },
        detail: { tags: ['Cats'], summary: 'Create a new cat' },
      }
    )
    .get(
      '/',
      async () => {
        const cats = await getAllCatsUseCase.execute();
        return { status: 'success', data: catMapper.toDTOList(cats) };
      },
      {
        response: {
          200: t.Object({
            status: t.String(),
            data: t.Array(t.Ref('cat.response')),
          }),
          500: 'response.error.internal',
        },
        detail: { tags: ['Cats'], summary: 'Get all cats' },
      }
    )
    .get(
      '/:id',
      async ({ params, set }) => {
        const result = await getCatByIdUseCase.execute(new CatId(params.id));
        if (result.isLeft()) {
          return handleUseCaseError(result.value, set);
        }
        return { status: 'success', data: catMapper.toDTO(result.value) };
      },
      {
        params: 'cat.params',
        response: {
          200: t.Object({
            status: t.String(),
            data: t.Ref('cat.response'),
          }),
          404: 'response.error.notfound',
          500: 'response.error.internal',
        },
        detail: { tags: ['Cats'], summary: 'Get a cat by ID' },
      }
    )
    .delete(
      '/:id',
      async ({ params, set }) => {
        const result = await deleteCatUseCase.execute(new CatId(params.id));
        if (result.isLeft()) {
          return handleUseCaseError(result.value, set);
        }
        return { status: 'success', message: 'Cat deleted successfully' };
      },
      {
        params: 'cat.params',
        response: {
          200: t.Object({ status: t.String(), message: t.String() }),
          404: 'response.error.notfound',
          500: 'response.error.internal',
        },
        detail: { tags: ['Cats'], summary: 'Delete a cat by ID' },
      }
    )
    .patch(
      '/:id',
      async ({ params, body, set }) => {
        const result = await updateCatUseCase.execute({
          id: new CatId(params.id),
          ...body,
        });
        if (result.isLeft()) {
          return handleUseCaseError(result.value, set);
        }
        return { status: 'success', message: 'Cat updated successfully' };
      },
      {
        params: 'cat.params',
        body: 'cat.update.body',
        response: {
          200: t.Object({ status: t.String(), message: t.String() }),
          400: 'response.error.badrequest',
          404: 'response.error.notfound',
          500: 'response.error.internal',
        },
        detail: { tags: ['Cats'], summary: 'Update a cat by ID' },
      }
    );
};
