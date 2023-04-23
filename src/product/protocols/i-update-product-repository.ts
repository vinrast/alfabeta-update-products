import { Transaction } from 'sequelize/types';

export interface IUpdateProductProperties {
  price?: number;
  status?: string;
}

export interface IUpdateProductRepository {
  update(
    productId: string,
    product: IUpdateProductProperties,
    transaction?: Transaction
  ): Promise<boolean>;
}
