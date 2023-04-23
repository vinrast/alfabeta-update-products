import { Transaction } from 'sequelize';
import { ProductModel } from '../product.model';

export interface IGetProductRepository {
  getOne(filter: any, transaction?: Transaction): Promise<ProductModel>;
}
