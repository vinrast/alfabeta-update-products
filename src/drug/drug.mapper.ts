import { DrugModel } from './drug.model';
import { DrugDto } from './protocols';

export class DrugMapper {
  static alfabetaToDomain(raw: any): DrugModel {
    return new DrugModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(DrugModel: DrugModel): DrugDto {
    return {
      id: DrugModel.id,
      name: DrugModel.name,
    };
  }
}
