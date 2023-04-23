import { Transaction } from 'sequelize';

export interface IDeleteProductsRepository {
  delete(filter: any, transaction?: Transaction): Promise<number>;
}
