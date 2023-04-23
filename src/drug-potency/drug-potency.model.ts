import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface DrugPotencyAttributes {
  id: number;
  name: string;
}
export class DrugPotencyModel implements DrugPotencyAttributes {
  id: number;
  name: string;

  constructor(data: DrugPotencyAttributes) {
    DrugPotencyModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: DrugPotencyAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
