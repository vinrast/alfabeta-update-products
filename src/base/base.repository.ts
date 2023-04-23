import { IUpdateBaseProperties } from './protocols/i-update-base-repository';
import { BaseModel } from './base.model';
import {
  throwDatabaseError,
  throwInvalidParamError,
} from '@src/shared/utils/helpers/throw-helpers';
import { validateNumber, validateString } from '@src/shared/utils/validators';
import { Op } from 'sequelize';
import { ErrorHandler } from '@src/shared/utils/error-handlers/ErrorHandler';
import { Transaction } from 'sequelize';
import {
  ICountBasesRepository,
  ICreateBaseRepository,
  IDeleteBasesRepository,
  IGetBaseRepository,
  IGetBasesRepository,
  IUpdateBaseRepository,
} from './protocols';

export class BaseRepository
  implements
    ICreateBaseRepository,
    IGetBasesRepository,
    IGetBaseRepository,
    ICountBasesRepository,
    IDeleteBasesRepository,
    IUpdateBaseRepository
{
  async create(BaseModel: BaseModel, transaction?: Transaction) {
    try {
      await BaseModel.save({ transaction });
      return BaseModel;
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  async getOne(filter: any) {
    try {
      const query = this.createQueryObject();
      const queryFormat = this.formatQuery(filter, query);
      console.log(queryFormat);
      return await BaseModel.findOne(queryFormat);
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  async getAll(filter: any) {
    try {
      const query = this.createQueryObject();
      const queryFormat = this.formatQuery(filter, query);
      queryFormat.offset = queryFormat.offset ?? 0;
      queryFormat.limit = queryFormat.limit ?? 50;
      queryFormat.order = [['created_at', 'DESC']];
      return await BaseModel.findAll(queryFormat);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error;
      }
      throwDatabaseError(error);
    }
  }

  async delete(filter: any, transaction: Transaction) {
    try {
      return await BaseModel.destroy({
        where: this.getFilterAdapter(filter),
        transaction,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async count(filter: any) {
    try {
      const query = this.createQueryObject();
      const queryFormat = this.formatQuery(filter, query);
      return await BaseModel.count(queryFormat);
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  async update(
    id_alfabeta: number,
    fields: IUpdateBaseProperties,
    transaction: Transaction
  ) {
    try {
      await BaseModel.update(
        { price: fields.price },
        { where: { id_alfabeta }, transaction }
      );
      return true;
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  private createQueryObject(): any {
    return {
      where: {},
      include: [],
    };
  }

  private formatQuery(filter: any, query: any): any {
    try {
      if (filter?.alfabetaId) {
        validateNumber('alfabetaId', filter?.alfabetaId);
        query.where.id_alfabeta = filter?.alfabetaId;
      }

      if (filter?.localId) {
        validateNumber('localId', filter?.localId);
        query.where.id_pharol = filter?.localId;
      }

      if (filter?.initDate && !filter?.finalDate) {
        query.where.created_at = { [Op.gte]: filter?.initDate };
      }

      if (filter?.finalDate && !filter?.initDate) {
        query.where.created_at = { [Op.lte]: filter?.finalDate };
      }
      if (filter?.initDate && filter?.finalDate) {
        query.where.created_at = {
          [Op.between]: [filter?.initDate, filter?.finalDate],
        };
      }
      if (filter?.offset && !isNaN(parseInt(filter?.offset))) {
        query.offset = parseInt(filter?.offset);
      }
      if (filter?.limit && !isNaN(parseInt(filter?.limit))) {
        query.limit = parseInt(filter?.limit);
      }
      return query;
    } catch (error) {
      console.error(error);
      throwInvalidParamError('the filtrate parameters are incorrect');
    }
  }

  private getFilterAdapter(filter: any) {
    const filterAdapter = {
      alfabetaId: 'id_alfabeta',
      localId: 'id_pharol',
      createdAt: 'created_at',
      price: 'price',
      percentage: 'percentage',
    };

    const filterKeys = Object.keys(filter);
    const filterValues = Object.values(filter);
    const newFilter = {};
    filterKeys.forEach((key, index) => {
      newFilter[filterAdapter[key]] = filterValues[index];
    });

    return newFilter;
  }
}
