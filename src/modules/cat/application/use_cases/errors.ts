import { UseCaseError } from '../../../../shared/core/use_case_error';

export class CatNotFoundError extends UseCaseError {
  constructor() {
    super('Cat not found');
  }
}

export class ValidationError extends UseCaseError {}
