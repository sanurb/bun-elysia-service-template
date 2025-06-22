import type { Cat } from '../../domain/cat';

export interface CatDTO {
  id: string;
  name: string;
  age: number;
  breed: string;
}

export const CatMapper = {
  toDTO(cat: Cat): CatDTO {
    return {
      id: cat.id.toString(),
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    };
  },

  toDTOList(cats: readonly Cat[]): CatDTO[] {
    return cats.map(this.toDTO);
  },
};
