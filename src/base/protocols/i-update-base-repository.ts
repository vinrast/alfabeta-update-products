import { Transaction } from 'sequelize/types';
import { BaseModel } from '../base.model';

export interface IUpdateBaseProperties {
  price: number;
}

export interface IUpdateBaseRepository {
  update(
    alfabetaId: number,
    fields: IUpdateBaseProperties,
    transaction?: Transaction
  ): Promise<boolean>;
}
