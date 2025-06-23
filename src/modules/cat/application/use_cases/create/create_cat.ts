import { type Either, left, right } from '../../../../../shared/core/result';
import type { UseCase } from '../../../../../shared/core/use_case';
import { Cat } from '../../../domain/cat';
import type { CatRepository } from '../../../domain/cat_repository';
import { ValidationError } from '../errors';

export interface CreateCatRequest {
  name: string;
  age: number;
  breed: string;
}

type Response = Either<ValidationError, void>;

export class CreateCatUseCase
  implements UseCase<CreateCatRequest, Promise<Response>>
{
  constructor(private readonly catRepository: CatRepository) {}

  async execute(request: CreateCatRequest): Promise<Response> {
    const catResult = Cat.create({
      name: request.name,
      age: request.age,
      breed: request.breed,
    });

    if (catResult.isFailure) {
      return left(new ValidationError(catResult.getErrorValue()));
    }

    await this.catRepository.save(catResult.getValue());
    return right(undefined);
  }
}
