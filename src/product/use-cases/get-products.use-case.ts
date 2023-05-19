import { IGetProductsRepository, IGetProductsUseCase } from '../protocols';

export class GetProductsUseCase implements IGetProductsUseCase {
  constructor(private readonly productsRepository: IGetProductsRepository) {}

  async execute(filter?: any) {
    return this.productsRepository.getAll();
  }
}
