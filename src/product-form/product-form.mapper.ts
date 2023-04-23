import { ProductFormModel } from './product-form.model';
import { ProductFormDto } from './protocols';

export class ProductFormMapper {
  static alfabetaToDomain(raw: any): ProductFormModel {
    return new ProductFormModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(ProductFormModel: ProductFormModel): ProductFormDto {
    return {
      id: ProductFormModel.id,
      name: ProductFormModel.name,
    };
  }
}
