import { Elysia, t } from 'elysia';
import { CatMapper } from '../../application/mappers/cat_mapper';
import { CreateCatUseCase } from '../../application/use_cases/create/create_cat';
import { DeleteCatUseCase } from '../../application/use_cases/delete/delete_cat';
import { GetAllCatsUseCase } from '../../application/use_cases/get_all/get_all_cats';
import { GetCatByIdUseCase } from '../../application/use_cases/get_by_id/get_cat_by_id';
import { CatId } from '../../domain/cat_id';
import { CatSchema } from '../../domain/cat_schema';
import { InMemoryCatRepository } from '../in_memory_cat_repository';

const catRepository = new InMemoryCatRepository();
const createCatUseCase = new CreateCatUseCase(catRepository);
const getAllCatsUseCase = new GetAllCatsUseCase(catRepository);
const getCatByIdUseCase = new GetCatByIdUseCase(catRepository);
const deleteCatUseCase = new DeleteCatUseCase(catRepository);

const errorResponse = {
  500: t.Object({
    status: t.String(),
    message: t.String(),
  }),
  404: t.Object({
    status: t.String(),
    message: t.String(),
  }),
};

export const catController = new Elysia({ prefix: '/cats' })
  .decorate('createCatUseCase', createCatUseCase)
  .decorate('getAllCatsUseCase', getAllCatsUseCase)
  .decorate('getCatByIdUseCase', getCatByIdUseCase)
  .decorate('deleteCatUseCase', deleteCatUseCase)
  .post(
    '/',
    async ({ createCatUseCase, body, set }) => {
      try {
        await createCatUseCase.execute(body);
        set.status = 201;
        return { status: 'success', message: 'Cat created successfully' };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        age: t.Number(),
        breed: t.String(),
      }),
      response: {
        201: t.Object({
          status: t.String(),
          message: t.String(),
        }),
        ...errorResponse,
      },
      detail: {
        tags: ['Cats'],
        summary: 'Create a new cat',
      },
    }
  )
  .get(
    '/',
    async ({ getAllCatsUseCase, set }) => {
      try {
        const cats = await getAllCatsUseCase.execute();
        return { status: 'success', data: CatMapper.toDTOList(cats) };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.String(),
          data: t.Array(CatSchema),
        }),
        ...errorResponse,
      },
      detail: {
        tags: ['Cats'],
        summary: 'Get all cats',
      },
    }
  )
  .get(
    '/:id',
    async ({ getCatByIdUseCase, params, set }) => {
      try {
        const cat = await getCatByIdUseCase.execute(new CatId(params.id));
        if (!cat) {
          set.status = 404;
          return { status: 'error', message: 'Cat not found' };
        }
        return { status: 'success', data: CatMapper.toDTO(cat) };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.String(),
          data: CatSchema,
        }),
        ...errorResponse,
      },
      detail: {
        tags: ['Cats'],
        summary: 'Get a cat by ID',
      },
    }
  )
  .delete(
    '/:id',
    async ({ deleteCatUseCase, params, set }) => {
      try {
        await deleteCatUseCase.execute(new CatId(params.id));
        set.status = 200;
        return { status: 'success', message: 'Cat deleted successfully' };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.String(),
          message: t.String(),
        }),
        ...errorResponse,
      },
      detail: {
        tags: ['Cats'],
        summary: 'Delete a cat by ID',
      },
    }
  );
