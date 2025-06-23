import { type Either, left, right } from '../../../../../shared/core/result';
import type { UseCase } from '../../../../../shared/core/use_case';
import type { CatId } from '../../../domain/cat_id';
import type { CatRepository } from '../../../domain/cat_repository';
import { CatNotFoundError } from '../errors';

type Response = Either<CatNotFoundError, void>;

export class DeleteCatUseCase implements UseCase<CatId, Promise<Response>> {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(id: CatId): Promise<Response> {
    const cat = await this.catRepository.findById(id);
    if (!cat) {
      return left(new CatNotFoundError());
    }

    await this.catRepository.delete(id);
    return right(undefined);
  }
}
