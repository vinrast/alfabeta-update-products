import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface QuantityAttributes {
  id: number;
  name: string;
}
export class QuantityModel implements QuantityAttributes {
  id: number;
  name: string;

  constructor(data: QuantityAttributes) {
    QuantityModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: QuantityAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
