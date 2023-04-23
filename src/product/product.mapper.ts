import { replaceCommasHelper } from '@src/shared/utils/helpers/replace-commas-helper';
import { uuidGenerator } from '@src/shared/utils/helpers/uuid-generator-helper';
import { ProductModel } from './product.model';
import { ProductDto, ProductPriceUpdatedDto } from './protocols';

export class ProductMapper {
  static toDomain(raw: ProductDto): ProductModel {
    return new ProductModel({
      id: raw.id || uuidGenerator(),
      id_alfabeta: raw.alfabetaId,
      effective_date: raw.effectiveDate,
      price: raw.price,
      status: raw.status,
      name: raw.name,
      presentation: raw.presentation,
      is_imported: raw.isImported,
      is_refrigerated: raw.isRefrigerated,
      troquel: raw.troquel,
      barcodes: raw.barcodes as string[],
      iva: raw.iva,
      id_laboratory: raw.laboratoryId,
      id_sale_type: raw.saleTypeId,
      id_control_type_public_health: raw.controlTypePublicHealthId,
      id_size: raw.sizeId,
      id_pharmaceutical_form: raw.pharmaceuticalFormId,
      id_supply_way: raw.supplyWayId,
      id_drug: raw.drugId,
      id_pharmaco_therapeutic_action: raw.pharmacotherapeuticActionId,
      id_potency_unit: raw.potencyUnitId,
      potency: raw.potency,
      id_presentation_unit: raw.presentationUnitId,
      number_units: raw.numberUnits,
      gtins: raw.gtins as string[],
      lien_mark: raw.lienMark,
      celiac_mark: raw.celiacMark,
      snomed_code: raw.snomedCode,
      prospect: raw.prospect,
      pami_porcent: raw.pamiPorcent,
      pami_sale_price: raw.pamiSalePrice,
      sifar_mark: raw.sifarMark,
      ioma_fixed_amount: raw.iomaFixedAmount,
      ioma_mark: raw.iomaMark,
      id_detail_drug: raw.detailDrugId,
      detail_drug_potency: raw.detailDrugPotency,
      id_detail_drug_potency_unit: raw.detailDrugPotencyUnitId,
    });
  }

  static toRowCSV(productModel: ProductModel) {
    const barCodes =
      productModel.barcodes && productModel.barcodes?.length > 1
        ? productModel.barcodes.join('  /  ')
        : productModel.barcodes?.pop() || '';
    const gtins =
      productModel.gtins && productModel.gtins.length > 1
        ? productModel.gtins.join('  /  ')
        : productModel.gtins?.pop() || '';

    return `${productModel.id_alfabeta}  ,  ${
      productModel.effective_date
    }  ,  ${productModel.price}  ,  ${
      productModel.status
    }  ,  ${replaceCommasHelper(productModel.name)}  ,  ${replaceCommasHelper(
      productModel.presentation
    )}  ,  ${productModel.is_imported}  ,  ${
      productModel.is_refrigerated
    }  ,  ${productModel.troquel || ''}  ,  ${barCodes}  ,  ${
      productModel.iva
    }  ,  ${
      replaceCommasHelper(productModel.getDataValue('laboratory')) || ''
    }  ,  ${replaceCommasHelper(
      productModel.getDataValue('saleType') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('controlTypePublicHealth')
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('size') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('pharmaceuticalForm') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('supplyWay') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('drug') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('pharmacotherapeuticAction') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('potencyUnit') || ''
    )}  ,  ${replaceCommasHelper(
      productModel.potency || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('presentationUnit') || ''
    )}  ,  ${productModel.number_units || ''}  ,  ${gtins}  ,  ${
      productModel.lien_mark || ''
    }  ,  ${productModel.celiac_mark || ''}  ,  ${
      productModel.snomed_code || ''
    }  ,  ${productModel.prospect || ''}  ,  ${replaceCommasHelper(
      productModel.pami_porcent || ''
    )}  ,  ${productModel.pami_sale_price || 0}  ,  ${
      productModel.sifar_mark || ''
    }  ,  ${productModel.ioma_fixed_amount || 0}  ,  ${
      productModel.ioma_mark || ''
    }  ,  ${
      productModel.getDataValue('detailDrug') || ''
    }  ,  ${replaceCommasHelper(
      productModel.detail_drug_potency || ''
    )}  ,  ${replaceCommasHelper(
      productModel.getDataValue('detail_drug_potency') || ''
    )} \n`;
  }

  static toUpdateProductPriceCSV(product: any): string {
    return `${product.alfabetaId}, ${product.localId || ''}, ${
      product.currentPrice
    }, ${product.previusPrice} \n`;
  }

  static toUpdateProductStatusCSV(product: any): string {
    return `${product.alfabetaId}, ${product.localId || ''} \n`;
  }

  static toDTO(ProductModel: ProductModel): ProductDto {
    return {
      id: ProductModel.id,
      alfabetaId: ProductModel.id_alfabeta,
      effectiveDate: ProductModel.effective_date,
      price: ProductModel.price,
      status: ProductModel.status,
      name: ProductModel.name,
      presentation: ProductModel.presentation,
      isImported: ProductModel.is_imported,
      isRefrigerated: ProductModel.is_refrigerated,
      troquel: ProductModel.troquel,
      barcodes: ProductModel.barcodes,
      iva: ProductModel.iva,
      laboratoryId: ProductModel.id_laboratory,
      saleTypeId: ProductModel.id_sale_type,
      controlTypePublicHealthId: ProductModel.id_control_type_public_health,
      sizeId: ProductModel.id_size,
      pharmaceuticalFormId: ProductModel.id_pharmaceutical_form,
      supplyWayId: ProductModel.id_supply_way,
      drugId: ProductModel.id_drug,
      pharmacotherapeuticActionId: ProductModel.id_pharmaco_therapeutic_action,
      potencyUnitId: ProductModel.id_potency_unit,
      potency: ProductModel.potency,
      presentationUnitId: ProductModel.id_presentation_unit,
      numberUnits: ProductModel.number_units,
      gtins: ProductModel.gtins,
      lienMark: ProductModel.lien_mark,
      celiacMark: ProductModel.celiac_mark,
      snomedCode: ProductModel.snomed_code,
      prospect: ProductModel.prospect,
      pamiPorcent: ProductModel.pami_porcent,
      pamiSalePrice: ProductModel.pami_sale_price,
      sifarMark: ProductModel.sifar_mark,
      iomaFixedAmount: ProductModel.ioma_fixed_amount,
      iomaMark: ProductModel.ioma_mark,
      detailDrugId: ProductModel.id_detail_drug,
      detailDrugPotency: ProductModel.detail_drug_potency,
      detailDrugPotencyUnitId: ProductModel.id_detail_drug_potency_unit,
    };
  }

  // static toCreateProductCSV(productModel: ProductModel): ProductDto {
  //   const barCodes =
  //     productModel.barcodes && productModel.barcodes?.length > 1
  //       ? productModel.barcodes.join('  /  ')
  //       : productModel.barcodes?.pop() || '';
  //   const gtins =
  //     productModel.gtins && productModel.gtins.length > 1
  //       ? productModel.gtins.join('  /  ')
  //       : productModel.gtins?.pop() || '';

  //   const productDto: ProductDto = {
  //     alfabetaId: productModel.alfabetaId,
  //     effectiveDate: productModel.effectiveDate,
  //     price: productModel.price,
  //     status: productModel.status,
  //     name: replaceCommasHelper(productModel.name),
  //     presentation: replaceCommasHelper(productModel.presentation),
  //     isImported: productModel.isImported,
  //     isRefrigerated: productModel.isRefrigerated,
  //     troquel: productModel.troquel || '',
  //     barcodes: barCodes,
  //     iva: productModel.iva,
  //     laboratory:
  //       replaceCommasHelper(productModel.getDataValue('laboratory')) || '',
  //     saleType: replaceCommasHelper(
  //       productModel.getDataValue('saleType') || ''
  //     ),
  //     controlTypePublicHealth: replaceCommasHelper(
  //       productModel.getDataValue('controlTypePublicHealth') || ''
  //     ),
  //     size: replaceCommasHelper(productModel.getDataValue('size') || ''),
  //     pharmaceuticalForm: replaceCommasHelper(
  //       productModel.getDataValue('pharmaceuticalForm') || ''
  //     ),
  //     supplyWay: replaceCommasHelper(
  //       productModel.getDataValue('supplyWay') || ''
  //     ),
  //     drug: replaceCommasHelper(productModel.getDataValue('drug') || ''),
  //     pharmacotherapeuticAction: replaceCommasHelper(
  //       productModel.getDataValue('pharmacotherapeuticAction') || ''
  //     ),
  //     potencyUnit: replaceCommasHelper(
  //       productModel.getDataValue('potencyUnit') || ''
  //     ),
  //     potency: replaceCommasHelper(productModel.potency || ''),
  //     presentationUnit: replaceCommasHelper(
  //       productModel.getDataValue('presentationUnit') || ''
  //     ),
  //     numberUnits: productModel.numberUnits || '',
  //     gtins: gtins,
  //     lienMark: productModel.lienMark || '',
  //     celiacMark: productModel.celiacMark || '',
  //     snomedCode: productModel.snomedCode || '',
  //     prospect: productModel.prospect || '',
  //     pamiPorcent: replaceCommasHelper(productModel.pamiPorcent || ''),
  //     pamiSalePrice: productModel.pamiSalePrice || 0,
  //     sifarMark: productModel.sifarMark || '',
  //     iomaFixedAmount: productModel.iomaFixedAmount || 0,
  //     iomaMark: productModel.iomaMark || '',
  //     detailDrug: productModel.getDataValue('detailDrug') || '',
  //     detailDrugPotency: replaceCommasHelper(
  //       productModel.detailDrugPotency || ''
  //     ),
  //     detailDrugPotencyUnit: replaceCommasHelper(
  //       productModel.getDataValue('detailDrugPotencyUnit') || ''
  //     ),
  //   };
  //   return productDto;
  // }
}
