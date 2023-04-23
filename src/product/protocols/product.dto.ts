export interface ProductPriceUpdatedDto {
  alfabetaId: number;
  localId: number;
  currentPrice: number;
  previousPrice: number;
}

export interface ProductDto {
  id?: string;
  alfabetaId: number;
  name: string;
  presentation: string;
  effectiveDate: string;
  price: number;
  status: string;
  isImported: string;
  isRefrigerated: string;
  troquel: string;
  barcodes: Array<string> | string;
  iva: string;
  laboratoryId?: number;
  laboratory?: string;
  saleTypeId?: number;
  saleType?: string;
  controlTypePublicHealthId?: number;
  controlTypePublicHealth?: string;
  sizeId?: number;
  size?: string;
  pharmaceuticalFormId?: number;
  pharmaceuticalForm?: string;
  supplyWayId?: number;
  supplyWay?: string;
  drugId?: number;
  drug?: string;
  pharmacotherapeuticActionId?: number;
  pharmacotherapeuticAction?: string;
  potencyUnitId?: number;
  potencyUnit?: string;
  potency?: string;
  presentationUnitId?: number;
  presentationUnit?: string;
  numberUnits?: string;
  gtins?: Array<string> | string;
  lienMark?: string;
  celiacMark?: string;
  snomedCode?: string;
  prospect?: string;
  pamiPorcent?: string;
  pamiSalePrice?: number;
  sifarMark?: string;
  iomaFixedAmount?: number;
  iomaMark?: string;
  detailDrugId?: number;
  detailDrug?: string;
  detailDrugPotency?: string;
  detailDrugPotencyUnitId?: number;
  detailDrugPotencyUnit?: string;
  currentPrice?: number;
  previusPrice?: number;
  localId?: number;
}
