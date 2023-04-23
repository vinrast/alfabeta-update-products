import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface DrugAttributes {
  id: number;
  name: string;
}
export class DrugModel implements DrugAttributes {
  id: number;
  name: string;

  constructor(data: DrugAttributes) {
    DrugModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: DrugAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
