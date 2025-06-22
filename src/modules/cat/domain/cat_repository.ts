import type { Cat } from './cat';
import type { CatId } from './cat_id';

export interface CatRepository {
  save(cat: Cat): Promise<void>;
  findById(id: CatId): Promise<Cat | null>;
  findAll(): Promise<readonly Cat[]>;
  delete(id: CatId): Promise<void>;
}
