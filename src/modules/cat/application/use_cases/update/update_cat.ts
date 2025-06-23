import { type Either, left, right } from '../../../../../shared/core/result';
import type { UseCase } from '../../../../../shared/core/use_case';
import type { CatId } from '../../../domain/cat_id';
import type { CatRepository } from '../../../domain/cat_repository';
import { CatNotFoundError, ValidationError } from '../errors';

export interface UpdateCatRequest {
  id: CatId;
  name?: string;
  age?: number;
  breed?: string;
}

type Response = Either<CatNotFoundError | ValidationError, void>;

export class UpdateCatUseCase
  implements UseCase<UpdateCatRequest, Promise<Response>>
{
  constructor(private readonly catRepository: CatRepository) {}

  async execute(request: UpdateCatRequest): Promise<Response> {
    const existingCat = await this.catRepository.findById(request.id);
    if (!existingCat) {
      return left(new CatNotFoundError());
    }

    const updatedCatResult = existingCat.update(request);

    if (updatedCatResult.isFailure) {
      return left(new ValidationError(updatedCatResult.getErrorValue()));
    }

    await this.catRepository.save(updatedCatResult.getValue());
    return right(undefined);
  }
}
