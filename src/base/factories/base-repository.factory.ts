import { BaseRepository } from '../base.repository';

export const baseRepositoryFactory = (): BaseRepository => {
  return new BaseRepository();
};
