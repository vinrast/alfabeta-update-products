import { Transaction } from 'sequelize/types';

export interface IUpdateProductPriceRepository {
  updatePrice(
    productId: string,
    price: number,
    transaction?: Transaction
  ): Promise<boolean>;
}
