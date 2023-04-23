export interface IUpdateLocalIdRepository {
  updatePrice(baseId: string, localId: number): Promise<boolean>;
}
