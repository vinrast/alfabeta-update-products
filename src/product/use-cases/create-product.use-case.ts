import { throwDatabaseError } from '@src/shared/utils/helpers/throw-helpers';
import { ICreateProductUseCase } from '../protocols/i-create-product-use-case';
import { ICreateProductRepository } from '../protocols/i-create-product-repository';
import { ProductModel } from '../product.model';
import { Transaction } from 'sequelize';
import { ProductMapper } from '../product.mapper';

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly createProductRepository: ICreateProductRepository
  ) {}
  async execute(product: ProductModel, transaction: Transaction = null) {
    const productModel =
      product instanceof ProductModel
        ? product
        : ProductMapper.toDomain(product);
    product.price = product.status === 'A' ? product.price : 0;
    try {
      return await this.createProductRepository.create(
        productModel,
        transaction
      );
    } catch (error) {
      console.error(error);
      throwDatabaseError(
        'ERROR AL CREAR EL PRODUCTO: ' + productModel.id_alfabeta
      );
    }
  }
}
