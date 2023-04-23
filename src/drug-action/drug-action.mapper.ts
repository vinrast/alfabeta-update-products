import { DrugActionModel } from './drug-action.model';
import { DrugActionDto } from './protocols';

export class DrugActionMapper {
  static alfabetaToDomain(raw: any): DrugActionModel {
    return new DrugActionModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(DrugActionModel: DrugActionModel): DrugActionDto {
    return {
      id: DrugActionModel.id,
      name: DrugActionModel.name,
    };
  }
}
