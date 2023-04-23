export interface ICountBasesRepository {
  count(filter?: any): Promise<any>;
}
