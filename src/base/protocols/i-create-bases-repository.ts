import { Transaction } from 'sequelize';
import { BaseModel } from '../base.model';

export interface ICreateBaseRepository {
  create(base: BaseModel, transaction?: Transaction): Promise<BaseModel>;
}
