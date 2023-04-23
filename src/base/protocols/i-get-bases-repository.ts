import { Transaction } from 'sequelize';
import { BaseModel } from '../base.model';

export interface IGetBasesRepository {
  getAll(filter?: any, transaction?: Transaction): Promise<Array<BaseModel>>;
}
