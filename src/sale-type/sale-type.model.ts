import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface SaleTypeAttributes {
  id: number;
  name: string;
}
export class SaleTypeModel implements SaleTypeAttributes {
  id: number;
  name: string;

  constructor(data: SaleTypeAttributes) {
    SaleTypeModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: SaleTypeAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
