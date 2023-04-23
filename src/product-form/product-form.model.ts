import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface ProductFormAttributes {
  id: number;
  name: string;
}
export class ProductFormModel implements ProductFormAttributes {
  id: number;
  name: string;

  constructor(data: ProductFormAttributes) {
    ProductFormModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: ProductFormAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
