import { QuantityModel } from './quantity.model';
import { QuantityDto } from './protocols';

export class QuantityMapper {
  static alfabetaToDomain(raw: any): QuantityModel {
    return new QuantityModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(QuantityModel: QuantityModel): QuantityDto {
    return {
      id: QuantityModel.id,
      name: QuantityModel.name,
    };
  }
}
