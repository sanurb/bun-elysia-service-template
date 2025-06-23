import { type Either, left, right } from '../../../../../shared/core/result';
import type { UseCase } from '../../../../../shared/core/use_case';
import type { Cat } from '../../../domain/cat';
import type { CatId } from '../../../domain/cat_id';
import type { CatRepository } from '../../../domain/cat_repository';
import { CatNotFoundError } from '../errors';

type Response = Either<CatNotFoundError, Cat>;

export class GetCatByIdUseCase implements UseCase<CatId, Promise<Response>> {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(id: CatId): Promise<Response> {
    const cat = await this.catRepository.findById(id);
    return cat ? right(cat) : left(new CatNotFoundError());
  }
}
