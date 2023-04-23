import { SupplyWayModel } from './supply-way.model';
import { SupplyWayDto } from './protocols';

export class SupplyWayMapper {
  static alfabetaToDomain(raw: any): SupplyWayModel {
    return new SupplyWayModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(SupplyWayModel: SupplyWayModel): SupplyWayDto {
    return {
      id: SupplyWayModel.id,
      name: SupplyWayModel.name,
    };
  }
}
