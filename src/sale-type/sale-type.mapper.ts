import { SaleTypeModel } from './sale-type.model';
import { SaleTypeDto } from './protocols';

export class SaleTypeMapper {
  static alfabetaToDomain(raw: any): SaleTypeModel {
    return new SaleTypeModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(SaleTypeModel: SaleTypeModel): SaleTypeDto {
    return {
      id: SaleTypeModel.id,
      name: SaleTypeModel.name,
    };
  }
}
