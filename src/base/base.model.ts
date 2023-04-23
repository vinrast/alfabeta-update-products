import { ProductModel } from './../product/product.model';
import * as Sequelize from 'sequelize';
import { Model } from 'sequelize';
import { database } from '../shared/database';

export interface BaseAttributes {
  id_alfabeta: number;
  id_pharol?: number;
  price?: number;
  percentage?: number;
}

export class BaseModel extends Model<BaseAttributes> implements BaseAttributes {
  id_alfabeta: number;
  id_pharol: number;
  price?: number;
  percentage?: number;
}

BaseModel.init(
  {
    id_alfabeta: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    id_pharol: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    price: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    percentage: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
  },
  {
    sequelize: database.connection,
    tableName: 't_alfabeta_base',
    freezeTableName: true,
    timestamps: false,
  }
);

ProductModel.hasOne(BaseModel, {
  foreignKey: 'id_alfabeta',
  sourceKey: 'id_alfabeta',
  as: 'base',
});

BaseModel.belongsTo(ProductModel, {
  foreignKey: 'id_alfabeta',
  targetKey: 'id_alfabeta',
  as: 'product',
});
