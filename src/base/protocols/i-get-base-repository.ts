import { Transaction } from 'sequelize';
import { BaseModel } from '../base.model';

export interface IGetBaseRepository {
  getOne(filter: any, transaction?: Transaction): Promise<BaseModel>;
}
