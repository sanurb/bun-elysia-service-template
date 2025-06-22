import type { UseCase } from '../../../../../shared/core/use_case';
import type { CatId } from '../../../domain/cat_id';
import type { CatRepository } from '../../../domain/cat_repository';

export class DeleteCatUseCase implements UseCase<CatId, Promise<void>> {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(request: CatId): Promise<void> {
    await this.catRepository.delete(request);
  }
}
