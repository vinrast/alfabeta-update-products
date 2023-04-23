import { LaboratoryModel } from './laboratory.model';
import { LaboratoryDto } from './protocols';

export class LaboratoryMapper {
  static alfabetaToDomain(raw: any): LaboratoryModel {
    return new LaboratoryModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(LaboratoryModel: LaboratoryModel): LaboratoryDto {
    return {
      id: LaboratoryModel.id,
      name: LaboratoryModel.name,
    };
  }
}
