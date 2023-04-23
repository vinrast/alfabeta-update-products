import { ControlModel } from './control.model';
import { ControlDto } from './protocols';

export class ControlMapper {
  static alfabetaToDomain(raw: any): ControlModel {
    return new ControlModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(ControlModel: ControlModel): ControlDto {
    return {
      id: ControlModel.id,
      name: ControlModel.name,
    };
  }
}
