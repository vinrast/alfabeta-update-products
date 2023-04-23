import { baseRepositoryFactory } from './../../base/factories/base-repository.factory';
import { createProductUseCaseFactory } from './create-product-use-case.factory';
import { soapServiceFactory } from '@src/shared/services/factories';
import { productRepositoryFactory } from '.';
import { UpdateProductsUseCase } from '../use-cases';

export const updateProductsUseCaseFactory = () => {
  const productRepository = productRepositoryFactory();
  const baseRepository = baseRepositoryFactory();
  return new UpdateProductsUseCase(
    soapServiceFactory(),
    productRepository,
    baseRepository,
    createProductUseCaseFactory(),
    productRepository,
    baseRepository
  );
};
