import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface DrugActionAttributes {
  id: number;
  name: string;
}
export class DrugActionModel implements DrugActionAttributes {
  id: number;
  name: string;

  constructor(data: DrugActionAttributes) {
    DrugActionModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: DrugActionAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
