import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface LaboratoryAttributes {
  id: number;
  name: string;
}
export class LaboratoryModel implements LaboratoryAttributes {
  id: number;
  name: string;

  constructor(data: LaboratoryAttributes) {
    LaboratoryModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: LaboratoryAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
