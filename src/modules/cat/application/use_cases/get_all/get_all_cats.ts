import type { UseCase } from '../../../../../shared/core/use_case';
import type { Cat } from '../../../domain/cat';
import type { CatRepository } from '../../../domain/cat_repository';

export class GetAllCatsUseCase
  implements UseCase<void, Promise<readonly Cat[]>>
{
  constructor(private readonly catRepository: CatRepository) {}

  async execute(): Promise<readonly Cat[]> {
    return this.catRepository.findAll();
  }
}
