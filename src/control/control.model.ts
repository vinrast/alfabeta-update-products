import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface ControlAttributes {
  id: number;
  name: string;
}
export class ControlModel implements ControlAttributes {
  id: number;
  name: string;

  constructor(data: ControlAttributes) {
    ControlModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: ControlAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
