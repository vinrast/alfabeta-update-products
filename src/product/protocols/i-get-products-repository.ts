import { Transaction } from 'sequelize';
import { ProductModel } from '../product.model';

export interface IGetProductsRepository {
  getAll(filter?: any, transaction?: Transaction): Promise<Array<ProductModel>>;
}
