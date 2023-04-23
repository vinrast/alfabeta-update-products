import { ProductSizeModel } from './product-size.model';
import { ProductSizeDto } from './protocols';

export class ProductSizeMapper {
  static alfabetaToDomain(raw: any): ProductSizeModel {
    return new ProductSizeModel({
      id: raw.id,
      name: raw.name,
    });
  }

  static toDTO(ProductSizeModel: ProductSizeModel): ProductSizeDto {
    return {
      id: ProductSizeModel.id,
      name: ProductSizeModel.name,
    };
  }
}
