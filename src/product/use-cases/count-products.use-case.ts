import { ICountProductsRepository, ICountProductsUseCase } from '../protocols';

export class CountProductsUseCase implements ICountProductsUseCase {
  constructor(private readonly productRepository: ICountProductsRepository) {}

  async execute(filter?: any): Promise<number> {
    const products = await this.productRepository.count(filter);
    return products;
  }
}
