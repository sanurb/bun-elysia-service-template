import type { UseCase } from '../../../../../shared/core/use_case';
import type { Cat } from '../../../domain/cat';
import type { CatId } from '../../../domain/cat_id';
import type { CatRepository } from '../../../domain/cat_repository';

export class GetCatByIdUseCase implements UseCase<CatId, Promise<Cat | null>> {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(request: CatId): Promise<Cat | null> {
    return this.catRepository.findById(request);
  }
}
