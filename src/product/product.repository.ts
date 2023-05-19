import { ProductModel } from './product.model';
import {
  throwDatabaseError,
  throwInvalidParamError,
} from '@src/shared/utils/helpers/throw-helpers';
import { validateNumber, validateString } from '@src/shared/utils/validators';
import { Op } from 'sequelize';
import { ErrorHandler } from '@src/shared/utils/error-handlers/ErrorHandler';
import { Transaction } from 'sequelize';
import {
  ICountProductsRepository,
  ICreateProductRepository,
  IDeleteProductsRepository,
  IGetProductRepository,
  IGetProductsRepository,
  IUpdateProductProperties,
  IUpdateProductRepository,
} from './protocols';
import { BaseModel } from '../base/base.model';

export class ProductRepository
  implements
    ICreateProductRepository,
    IGetProductsRepository,
    IGetProductRepository,
    ICountProductsRepository,
    IDeleteProductsRepository,
    IUpdateProductRepository
{
  async create(ProductModel: ProductModel, transaction?: Transaction) {
    try {
      await ProductModel.save({ transaction });
      return ProductModel;
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  async getOne(filter: any) {
    try {
      const query = this.createQueryObject();
      const queryFormat = this.formatQuery(filter, query);
      return ProductModel.findOne(queryFormat);
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  async getAll(filter: any) {
    try {
      const query = this.createQueryObject();
      const queryFormat = this.formatQuery(filter, query);
      queryFormat.offset = queryFormat.offset ?? 0;
      queryFormat.limit = queryFormat.limit;
      queryFormat.order = [['created_at', 'DESC']];
      return await ProductModel.findAll(queryFormat);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error;
      }
      throwDatabaseError(error);
    }
  }

  async update(
    id: string,
    fields: IUpdateProductProperties,
    transaction: Transaction
  ) {
    try {
      await ProductModel.update(
        { price: fields.price, status: fields.status },
        { where: { id }, transaction }
      );
      return true;
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  async delete(filter: any, transaction: Transaction) {
    try {
      return await ProductModel.destroy({
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
      return await ProductModel.count(queryFormat);
    } catch (error) {
      throwDatabaseError(error);
    }
  }

  private createQueryObject(): any {
    return {
      where: {},
      include: [
        {
          model: BaseModel,
          as: 'base',
        },
      ],
    };
  }

  private formatQuery(filter: any, query: any): any {
    try {
      if (filter?.alfabetaId) {
        validateString('alfabetaId', filter?.alfabetaId);
        query.where.id_alfabeta = filter?.alfabetaId;
      }

      if (filter?.id) {
        validateNumber('id', filter?.id);
        query.where.id = filter?.id;
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
      id: 'id',
      alfabetaId: 'id_alfabeta',
      createdAt: 'created_at',
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
