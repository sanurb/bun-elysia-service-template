import type { UseCase } from '../../../../../shared/core/use_case';
import { Cat } from '../../../domain/cat';
import type { CatRepository } from '../../../domain/cat_repository';

export interface CreateCatRequest {
  name: string;
  age: number;
  breed: string;
}

export class CreateCatUseCase
  implements UseCase<CreateCatRequest, Promise<void>>
{
  constructor(private readonly catRepository: CatRepository) {}

  async execute(request: CreateCatRequest): Promise<void> {
    const cat = new Cat({
      name: request.name,
      age: request.age,
      breed: request.breed,
    });
    await this.catRepository.save(cat);
  }
}
