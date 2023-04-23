export interface ICountProductsRepository {
  count(filter?: any): Promise<any>;
}
