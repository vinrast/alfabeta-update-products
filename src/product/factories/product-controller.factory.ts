import { updateProductsUseCaseFactory } from './update-products-use-case.factory';
import { countProductsUseCaseFactory } from '.';
import ProductController from '../product.controller';

export const productControllerFactory = (): ProductController => {
  return new ProductController(
    countProductsUseCaseFactory(),
    updateProductsUseCaseFactory()
  );
};
