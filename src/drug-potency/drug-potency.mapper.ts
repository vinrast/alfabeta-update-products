import { DrugPotencyModel } from './drug-potency.model';
import { DrugPotencyDto } from './protocols';

export class DrugPotencyMapper {
  static alfabetaToDomain(raw: any): DrugPotencyModel {
    return new DrugPotencyModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(DrugPotencyModel: DrugPotencyModel): DrugPotencyDto {
    return {
      id: DrugPotencyModel.id,
      name: DrugPotencyModel.name,
    };
  }
}
