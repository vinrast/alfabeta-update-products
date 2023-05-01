import { baseRepositoryFactory } from './../../base/factories/base-repository.factory';
import { createProductUseCaseFactory } from './create-product-use-case.factory';
import {
  soapServiceFactory,
  mailerServiceFactory,
} from '@src/shared/services/factories';
import { productRepositoryFactory } from '.';
import { UpdateProductsUseCase } from '../use-cases';

export const updateProductsUseCaseFactory = () => {
  const productRepository = productRepositoryFactory();
  const baseRepository = baseRepositoryFactory();
  return new UpdateProductsUseCase(
    soapServiceFactory(),
    productRepository,
    createProductUseCaseFactory(),
    productRepository,
    baseRepository,
    mailerServiceFactory()
  );
};
