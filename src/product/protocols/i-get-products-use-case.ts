import { ProductModel } from '../product.model';

export interface IGetProductsUseCase {
  execute(filter?: any): Promise<Array<ProductModel>>;
}
