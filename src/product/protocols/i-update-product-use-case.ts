import { Transaction } from 'sequelize/types';
import { ProductDto } from '.';
import { ProductModel } from '../product.model';

export interface IUpdateProductUseCase {
  execute(
    product: ProductModel,
    productSaved: ProductModel,
    transaction?: Transaction
  ): Promise<boolean>;
}
