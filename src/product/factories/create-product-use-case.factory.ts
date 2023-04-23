import { baseRepositoryFactory } from '@src/base/factories';
import { productRepositoryFactory } from '.';
import { CreateProductUseCase } from '../use-cases';

export const createProductUseCaseFactory = () => {
  return new CreateProductUseCase(
    productRepositoryFactory(),
    baseRepositoryFactory()
  );
};
