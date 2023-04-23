import { ProductRepository } from '../product.repository';

export const productRepositoryFactory = (): ProductRepository => {
  return new ProductRepository();
};
