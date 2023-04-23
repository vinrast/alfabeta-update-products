import { Transaction } from 'sequelize';

export interface IDeleteBasesRepository {
  delete(filter: any, transaction?: Transaction): Promise<number>;
}
