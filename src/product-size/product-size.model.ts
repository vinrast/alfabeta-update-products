import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface ProductSizeAttributes {
  id: number;
  name: string;
}
export class ProductSizeModel implements ProductSizeAttributes {
  id: number;
  name: string;

  constructor(data: ProductSizeAttributes) {
    ProductSizeModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: ProductSizeAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
