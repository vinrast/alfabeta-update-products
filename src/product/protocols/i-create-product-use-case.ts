import { Transaction } from 'sequelize/types';
import { ProductDto } from '.';
import { ProductModel } from '../product.model';

export interface ICreateProductUseCase {
  execute(
    product: ProductModel | ProductDto,
    transaction?: Transaction
  ): Promise<ProductModel>;
}
