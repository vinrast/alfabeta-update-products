import { validateNumber, validateString } from '@src/shared/utils/validators';
import * as Sequelize from 'sequelize';
import { Model } from 'sequelize';
import { database } from '../shared/database';
import { BaseModel } from '../base/base.model';

export interface ProductAttributes {
  id: string;
  id_alfabeta: number;
  name: string;
  presentation: string;
  effective_date: string;
  price: number;
  status: string;
  is_imported: string;
  is_refrigerated: string;
  troquel: string;
  barcodes: Array<string>;
  iva: string;
  id_laboratory: number;
  id_sale_type: number;
  id_control_type_public_health: number;
  id_size: number;
  id_pharmaceutical_form: number;
  id_supply_way: number;
  id_drug: number;
  id_pharmaco_therapeutic_action: number;
  id_potency_unit: number;
  potency: string;
  id_presentation_unit: number;
  number_units: string;
  gtins: Array<string>;
  lien_mark: string;
  celiac_mark: string;
  snomed_code: string;
  prospect: string;
  pami_porcent: string;
  pami_sale_price: number;
  sifar_mark: string;
  ioma_fixed_amount: number;
  ioma_mark: string;
  id_detail_drug: number;
  detail_drug_potency: string;
  id_detail_drug_potency_unit: number;
  laboratory?: string;
  saleType?: string;
  controlTypePublicHealth?: string;
  size?: string;
  pharmaceuticalForm?: string;
  supplyWay?: string;
  drug?: string;
  pharmacotherapeuticAction?: string;
  potencyUnit?: string;
  presentationUnit?: string;
  detailDrug?: string;
  detailDrugPotencyUnit?: string;
  currentPrice?: number;
  previousPrice?: number;
  base?: BaseModel;
}

export class ProductModel
  extends Model<ProductAttributes>
  implements ProductAttributes
{
  id: string;
  id_alfabeta: number;
  name: string;
  presentation: string;
  effective_date: string;
  price: number;
  status: string;
  is_imported: string;
  is_refrigerated: string;
  troquel: string;
  barcodes: Array<string>;
  iva: string;
  id_laboratory: number;
  id_sale_type: number;
  id_control_type_public_health: number;
  id_size: number;
  id_pharmaceutical_form: number;
  id_supply_way: number;
  id_drug: number;
  id_pharmaco_therapeutic_action: number;
  id_potency_unit: number;
  potency: string;
  id_presentation_unit: number;
  number_units: string;
  gtins: Array<string>;
  lien_mark: string;
  celiac_mark: string;
  snomed_code: string;
  prospect: string;
  pami_porcent: string;
  pami_sale_price: number;
  sifar_mark: string;
  ioma_fixed_amount: number;
  ioma_mark: string;
  id_detail_drug: number;
  detail_drug_potency: string;
  id_detail_drug_potency_unit: number;
  laboratory: string;
  saleType: string;
  controlTypePublicHealth: string;
  size: string;
  pharmaceuticalForm: string;
  supplyWay: string;
  drug: string;
  pharmacotherapeuticAction: string;
  potencyUnit: string;
  presentationUnit: string;
  detailDrug: string;
  detailDrugPotencyUnit: string;
  currentPrice: number;
  previousPrice: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static validate(data: ProductAttributes) {
    validateString('id', data.id);
    validateNumber('id_alfabeta', data.id_alfabeta);
    validateString('name', data.name);
    validateString('presentation', data.presentation);
    return;
  }
}

ProductModel.init(
  {
    id: {
      allowNull: false,
      type: Sequelize.STRING,
      primaryKey: true,
    },
    id_alfabeta: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    presentation: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    effective_date: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    price: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    is_imported: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    is_refrigerated: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    troquel: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    barcodes: {
      allowNull: true,
      type: Sequelize.JSON,
    },
    iva: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    id_laboratory: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_sale_type: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_control_type_public_health: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_size: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_pharmaceutical_form: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_supply_way: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_drug: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_pharmaco_therapeutic_action: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    id_potency_unit: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    potency: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    id_presentation_unit: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    number_units: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    gtins: {
      allowNull: true,
      type: Sequelize.JSON,
    },
    lien_mark: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    celiac_mark: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    snomed_code: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    prospect: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    pami_porcent: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    pami_sale_price: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    sifar_mark: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    ioma_fixed_amount: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    ioma_mark: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    id_detail_drug: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    detail_drug_potency: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    id_detail_drug_potency_unit: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: database.connection,
    tableName: 't_alfabeta',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{ fields: ['id_alfabeta'], unique: true, name: 'id_alfabeta' }],
  }
);
