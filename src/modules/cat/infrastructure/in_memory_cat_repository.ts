import type { Cat } from '../domain/cat';
import type { CatId } from '../domain/cat_id';
import type { CatRepository } from '../domain/cat_repository';

export class InMemoryCatRepository implements CatRepository {
  private readonly cats: Map<string, Cat> = new Map();

  async save(cat: Cat): Promise<void> {
    this.cats.set(cat.id.toString(), cat);
  }

  async findById(id: CatId): Promise<Cat | null> {
    return this.cats.get(id.toString()) ?? null;
  }

  async findAll(): Promise<readonly Cat[]> {
    return [...this.cats.values()];
  }

  async delete(id: CatId): Promise<void> {
    this.cats.delete(id.toString());
  }
}
