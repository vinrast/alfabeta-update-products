import { Transaction } from 'sequelize';
import { ProductModel } from '../product.model';

export interface ICreateProductRepository {
  create(
    product: ProductModel,
    transaction?: Transaction
  ): Promise<ProductModel>;
}
