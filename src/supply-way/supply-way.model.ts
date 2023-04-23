import { validateNumber, validateString } from '@src/shared/utils/validators';

export interface SupplyWayAttributes {
  id: number;
  name: string;
}
export class SupplyWayModel implements SupplyWayAttributes {
  id: number;
  name: string;

  constructor(data: SupplyWayAttributes) {
    SupplyWayModel.validate(data);
    this.id = data.id;
    this.name = data.name;
  }

  public static validate(data: SupplyWayAttributes) {
    validateNumber('id', data.id);
    validateString('name', data.name);
    return;
  }
}
