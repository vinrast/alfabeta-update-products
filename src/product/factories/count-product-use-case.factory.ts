import { CountProductsUseCase } from '../use-cases';
import { productRepositoryFactory } from './product-repository.factory';

export const countProductsUseCaseFactory = (): CountProductsUseCase => {
  return new CountProductsUseCase(productRepositoryFactory());
};
