export interface ICountProductsUseCase {
  execute(filter?: any): Promise<number>;
}
