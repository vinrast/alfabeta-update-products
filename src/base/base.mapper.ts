import { uuidGenerator } from '@src/shared/utils/helpers/uuid-generator-helper';
import { BaseModel } from './base.model';
import { BaseDto } from './protocols';

export class BaseMapper {
  static toDomain(raw: any): BaseModel {
    return new BaseModel({
      id_alfabeta: raw.alfabetaId,
      id_pharol: raw.localId,
      price: raw.price,
      percentage: raw.percentage,
    });
  }

  static toDTO(BaseModel: BaseModel): BaseDto {
    return {
      alfabetaId: BaseModel.id_alfabeta,
      localId: BaseModel.id_pharol,
      price: BaseModel.price,
      percentage: BaseModel.percentage,
    };
  }
}
