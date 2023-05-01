import { IUpdateBaseRepository } from '@src/base/protocols';
import { removeFileHelper } from './../../shared/utils/helpers/remove-file-helper';
import { TransactionBuilder } from './../../shared/database/transaction-builder';
import { ProductMapper } from './../product.mapper';
import { LaboratoryMapper } from './../../laboratory/laboratory.mapper';
import { ControlMapper } from './../../control/control.mapper';
import { convertBase64ToFile } from '@src/shared/utils/helpers/base64-file-converter';
import { ISoapService } from '@src/shared/services/protocols';
import {
  ICreateProductUseCase,
  IGetProductRepository,
  IUpdateProductRepository,
  IUpdateProductsUseCase,
} from '../protocols';
import { unzipToTextConverter } from '@src/shared/utils/helpers/unzip-to-text-converter';
import { convertToJson } from '@src/shared/utils/helpers/xml-json-converter';
import { ControlModel } from '@src/control/control.model';
import { DrugModel } from '@src/drug/drug.model';
import { DrugActionModel } from '@src/drug-action/drug-action.model';
import { LaboratoryModel } from '@src/laboratory/laboratory.model';
import { ProductFormModel } from '@src/product-form/product-form.model';
import { ProductSizeModel } from '@src/product-size/product-size.model';
import { QuantityModel } from '@src/quantity/quantity.model';
import { SaleTypeModel } from '@src/sale-type/sale-type.model';
import { SupplyWayModel } from '@src/supply-way/supply-way.model';
import { DrugMapper } from '@src/drug/drug.mapper';
import { DrugActionMapper } from '@src/drug-action/drug-action.mapper';
import { ProductFormMapper } from '@src/product-form/product-form.mapper';
import { ProductSizeMapper } from '@src/product-size/product-size.mapper';
import { QuantityMapper } from '@src/quantity/quantity.mapper';
import { SaleTypeMapper } from '@src/sale-type/sale-type.mapper';
import { SupplyWayMapper } from '@src/supply-way/supply-way.mapper';
import { DrugPotencyModel } from '@src/drug-potency/drug-potency.model';
import { DrugPotencyMapper } from '@src/drug-potency/drug-potency.mapper';
import { ProductModel } from '../product.model';
import {
  productsCreatedCSVHeaders,
  productsHomologatedNonUpgradeableCSVHeaders,
  productsNotHomologatedCSVHeaders,
  productsUpdatedCSVHeaders,
  productsUpdatedStatusCSVHeaders,
} from '@src/shared/data';
import { addRowCSVGenerator } from '@src/shared/utils/helpers/add-row-csv-generator';
import { Transaction } from 'sequelize/types';
import { throwDatabaseError } from '@src/shared/utils/helpers/throw-helpers';
import { IEmailService } from '@src/shared/services/infrastructure/mailer/mailer.service';
import { resultFilesTemplate } from '@src/shared/services/infrastructure/mailer/templates/result-files-template.mailer';

export class UpdateProductsUseCase implements IUpdateProductsUseCase {
  private controls: Map<number, ControlModel> = new Map();
  private drugs: Map<number, DrugModel> = new Map();
  private drugActions: Map<number, DrugActionModel> = new Map();
  private laboratories: Map<number, LaboratoryModel> = new Map();
  private productForms: Map<number, ProductFormModel> = new Map();
  private productSizes: Map<number, ProductSizeModel> = new Map();
  private quantities: Map<number, QuantityModel> = new Map();
  private saleTypes: Map<number, SaleTypeModel> = new Map();
  private supplyWays: Map<number, SupplyWayModel> = new Map();
  private drugPotencies: Map<number, DrugPotencyModel> = new Map();
  private PATH_STORAGE = 'src/storage';
  private DATA_FILE_NAME = 'data.zip';
  private csvFilesNames = [
    'productos-nuevos.csv',
    'productos-actualizados.csv',
    'productos-activados.csv',
    'productos-desactivados.csv',
    'productos-no-homologados.csv',
    'productos-homologados-1-7.csv',
  ];
  productsUpdated: ProductModel[];
  productsCreated: ProductModel[];
  productsActivated: ProductModel[];
  productsDeactivated: ProductModel[];
  productsNotHomologated: ProductModel[];
  productsHomologatedNonUpgradeable: ProductModel[];

  constructor(
    private soapService: ISoapService,
    private getProductRepository: IGetProductRepository,
    private createProductUseCase: ICreateProductUseCase,
    private updateProductRepository: IUpdateProductRepository,
    private updateBaseRepository: IUpdateBaseRepository,
    private mailerService: IEmailService
  ) {}

  public async execute() {
    console.info(
      'INICIO DE LA ACTUALIZACION DE PRODUCTOS --> ',
      new Date().toLocaleString()
    );

    this.productsUpdated = [];
    this.productsCreated = [];
    this.productsActivated = [];
    this.productsDeactivated = [];
    this.productsNotHomologated = [];
    this.productsHomologatedNonUpgradeable = [];

    try {
      await this.soapService.createClient(this.getParamsSoapConnection());
      const dataInBase64 = await this.soapService.getDataInBase64(
        this.getXmlString()
      );

      this.removePreviusFilesGenerated();

      if (
        !(await convertBase64ToFile(
          dataInBase64,
          this.PATH_STORAGE,
          this.DATA_FILE_NAME
        ))
      ) {
        return;
      }

      console.info('ARCHIVO GENERADO --> ', new Date().toLocaleString());
      const data = await convertToJson(
        unzipToTextConverter(`${this.PATH_STORAGE}/${this.DATA_FILE_NAME}`)
      );

      if (!this.dataWithoutError(data)) {
        return;
      }

      this.setAllMapsAuxiliary(data);
      this.setHeadersCSVFiles();

      const totalProducts =
        data.respuesta.basecompleta[0].articulos[0].articulo;

      for await (const productUnformatted of totalProducts) {
        const transaction = await TransactionBuilder.build();
        try {
          const product = this.formatProduct(productUnformatted);
          const existProduct = await this.getProductRepository.getOne(
            {
              alfabetaId: product.id_alfabeta,
            },
            transaction
          );
          if (existProduct) {
            const isApprovedProduct = existProduct.getDataValue('base');

            if (!isApprovedProduct) {
              addRowCSVGenerator(
                ProductMapper.toNotHomologatedProductCSV({
                  alfabetaId: product.id_alfabeta,
                }),
                this.PATH_STORAGE,
                this.csvFilesNames[4]
              );
              this.productsNotHomologated.push(product);
            }

            if (isApprovedProduct) {
              const productPriceUpdated = await this.updatePriceProduct(
                product,
                existProduct,
                transaction
              );

              if (productPriceUpdated) {
                addRowCSVGenerator(
                  ProductMapper.toUpdateProductPriceCSV({
                    alfabetaId: product.id_alfabeta,
                    localId: isApprovedProduct.id_pharol,
                    currentPrice: product.price,
                    previousPrice: existProduct.price,
                  }),
                  this.PATH_STORAGE,
                  this.csvFilesNames[1]
                );

                this.productsUpdated.push(product);
              }

              if (product.status !== existProduct.status) {
                await this.updateStatus(
                  existProduct.id,
                  product.status,
                  transaction
                );
                if (product.status === 'A') {
                  this.productsActivated.push(product);
                  addRowCSVGenerator(
                    ProductMapper.toUpdateProductStatusCSV({
                      alfabetaId: product.id_alfabeta,
                      localId: isApprovedProduct.id_pharol,
                    }),
                    this.PATH_STORAGE,
                    this.csvFilesNames[2]
                  );
                }

                if (product.status === 'I') {
                  this.productsDeactivated.push(product);
                  addRowCSVGenerator(
                    ProductMapper.toUpdateProductStatusCSV({
                      alfabetaId: product.id_alfabeta,
                      localId: isApprovedProduct.id_pharol,
                    }),
                    this.PATH_STORAGE,
                    this.csvFilesNames[3]
                  );
                }
              }
            }
          }

          if (!existProduct) {
            await this.createProductUseCase.execute(product, transaction);
            this.setAuxiliariesValuesForCreateProduct(product);

            addRowCSVGenerator(
              ProductMapper.toRowCSV(product),
              this.PATH_STORAGE,
              this.csvFilesNames[0]
            );

            this.productsCreated.push(product);
          }
          await transaction.commit();
        } catch (error) {
          await transaction.rollback();
        }
      }

      this.showResults(totalProducts);

      this.sendEmail(totalProducts);

      console.info(
        'FIN DE LA ACTUALIZACION DE PRODUCTOS --> ',
        new Date().toLocaleString()
      );
    } catch (error) {
      console.error('error updating products: ', error);
    }
  }

  private getHeadersCSV(headers: string[]) {
    let headerRow = '';
    headers.forEach((header, index) => {
      if (index === headers.length - 1) {
        headerRow += header + '\n';
      } else {
        headerRow += header + ',';
      }
    });
    return headerRow;
  }

  private getParamsSoapConnection() {
    return {
      url: 'http://abws.alfabeta.net/alfabeta-webservice/abWsDescargas?wsdl',
      userId: 7881,
      password: 'fermin',
    };
  }

  private getXmlString() {
    return `
        <parametros>
        <basecompleta>S</basecompleta>
        <solotablas>N</solotablas>
        </parametros>
        `;
  }

  private removePreviusFilesGenerated() {
    removeFileHelper(this.PATH_STORAGE, this.DATA_FILE_NAME);
  }

  private dataWithoutError(data: any) {
    const errorCode = parseInt(data.respuesta.error[0].codigo[0]);

    if (errorCode) {
      console.error(
        `ERROR AL CONSULTAR PRODUCTOS : ${data.respuesta.error[0].descripcion[0]} -->`,
        new Date().toLocaleDateString()
      );
      return false;
    }

    return true;
  }

  private setAllMapsAuxiliary(data: any) {
    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Control[0].registro,
      0
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Monodro[0].registro,
      1
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Acciones[0].registro,
      2
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Laborato[0].registro,
      3
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Formas[0].registro,
      4
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Tamanio[0].registro,
      5
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Cantidad[0].registro,
      6
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].TipoVen[0].registro,
      7
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Via[0].registro,
      8
    );

    this.setMapsAuxliaryModels(
      data.respuesta.basecompleta[0].Potencia[0].registro,
      9
    );
  }

  private setHeadersCSVFiles() {
    const headersData = [];
    headersData.push(this.getHeadersCSV(productsCreatedCSVHeaders));
    headersData.push(this.getHeadersCSV(productsUpdatedCSVHeaders));
    headersData.push(this.getHeadersCSV(productsUpdatedStatusCSVHeaders));
    headersData.push(this.getHeadersCSV(productsUpdatedStatusCSVHeaders));
    headersData.push(this.getHeadersCSV(productsNotHomologatedCSVHeaders));
    headersData.push(
      this.getHeadersCSV(productsHomologatedNonUpgradeableCSVHeaders)
    );

    this.csvFilesNames.forEach((fileName, index) => {
      removeFileHelper(this.PATH_STORAGE, fileName);
      addRowCSVGenerator(headersData[index], this.PATH_STORAGE, fileName);
    });
  }

  private setMapsAuxliaryModels(data: Array<any>, index: number) {
    switch (index) {
      case 0:
        try {
          data.forEach((item: any) => {
            const control = ControlMapper.alfabetaToDomain(
              this.formatAuxiliaryModel(item)
            );
            if (this.controls.has(control.id)) return;
            this.controls.set(control.id, control);
          });
        } catch (error) {}

        break;

      case 1:
        data.forEach((item: any) => {
          const drug = DrugMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.drugs.has(drug.id)) return;
          this.drugs.set(drug.id, drug);
        });

        break;
      case 2:
        data.forEach((item: any) => {
          const drugAction = DrugActionMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.drugActions.has(drugAction.id)) return;
          this.drugActions.set(drugAction.id, drugAction);
        });

        break;

      case 3:
        data.forEach((item: any) => {
          const laboratory = LaboratoryMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.laboratories.has(laboratory.id)) return;
          this.laboratories.set(laboratory.id, laboratory);
        });

        break;

      case 4:
        data.forEach((item: any) => {
          const productForm = ProductFormMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.productForms.has(productForm.id)) return;
          this.productForms.set(productForm.id, productForm);
        });

        break;
      case 5:
        data.forEach((item: any) => {
          const productSize = ProductSizeMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.productSizes.has(productSize.id)) return;
          this.productSizes.set(productSize.id, productSize);
        });

        break;

      case 6:
        data.forEach((item: any) => {
          const quantity = QuantityMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.quantities.has(quantity.id)) return;
          this.quantities.set(quantity.id, quantity);
        });

        break;

      case 7:
        data.forEach((item: any) => {
          const saleType = SaleTypeMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.saleTypes.has(saleType.id)) return;
          this.saleTypes.set(saleType.id, saleType);
        });

      case 8:
        data.forEach((item: any) => {
          try {
            const supplyWay = SupplyWayMapper.alfabetaToDomain(
              this.formatAuxiliaryModel(item)
            );
            if (this.supplyWays.has(supplyWay.id)) return;
            this.supplyWays.set(supplyWay.id, supplyWay);
          } catch (error) {}
        });

        break;

      case 9:
        data.forEach((item: any) => {
          const drugPotency = DrugPotencyMapper.alfabetaToDomain(
            this.formatAuxiliaryModel(item)
          );
          if (this.drugPotencies.has(drugPotency.id)) return;
          this.drugPotencies.set(drugPotency.id, drugPotency);
        });

        break;
    }
  }

  private formatAuxiliaryModel(item: any) {
    return {
      id: parseInt(item.id.pop()),
      name: item.des.pop(),
    };
  }

  private formatProduct(product: any): ProductModel {
    const detailCoverages = product.cob?.pop();
    const detailDrug = product.mdrogasdetalle?.pop()?.mdroga?.pop();

    return ProductMapper.toDomain({
      alfabetaId: product.reg.pop(), // integer
      effectiveDate: product.vig.pop(), // string
      price: product.prc.pop(), // float
      status: product.est.pop(), // string A/I
      name: product.nom.pop(), // string
      presentation: product.pres.pop(), // string
      isImported: product.imp?.pop(), // string S/N
      isRefrigerated: product.hel?.pop(), // string S/N
      troquel: product.tro?.pop(), // string
      barcodes: product.bars?.pop()?.bar, //JSON
      iva: product.iva?.pop(), // string S/N
      laboratoryId: parseInt(product.labo?.pop()), // integer
      saleTypeId: parseInt(product.tipov?.pop()), // integer
      controlTypePublicHealthId: parseInt(product.salud?.pop()), // integer
      sizeId: parseInt(product.tam?.pop()), // integer
      pharmaceuticalFormId: parseInt(product.for?.pop()), // integer
      supplyWayId: parseInt(product.via?.pop()), // integer
      drugId: parseInt(product.dro?.pop()), // integer
      pharmacotherapeuticActionId: parseInt(product.acc?.pop()), // integer
      potencyUnitId: parseInt(product.upot?.pop()), // integer
      potency: product.pot?.pop(), // string
      presentationUnitId: parseInt(product.uuni?.pop()), // integer
      numberUnits: product.uni?.pop(), // string
      gtins: product.gtins?.pop()?.gtin, //lista
      lienMark: product.grav?.pop(), // string S/N
      celiacMark: product.cel?.pop(), // string S/N
      snomedCode: product.sno?.pop(), // string
      prospect: product.prospecto?.pop(), // string
      pamiPorcent: detailCoverages?.c1?.pop(), //string
      pamiSalePrice: detailCoverages?.c2?.pop(), // float
      sifarMark: detailCoverages?.c3?.pop(), // string S/N
      iomaFixedAmount: detailCoverages?.c4?.pop(), // float
      iomaMark: detailCoverages?.c5?.pop(), // string
      detailDrugId: parseInt(detailDrug?.id?.pop()) || 0, // integer
      detailDrugPotency: detailDrug?.po?.pop(), // string
      detailDrugPotencyUnitId: parseInt(detailDrug?.upo?.pop()) || 0, // integer
    });
  }

  private setAuxiliariesValuesForCreateProduct(product: ProductModel) {
    product.setDataValue(
      'laboratory',
      this.laboratories.get(product.id_laboratory)?.name
    );
    product.setDataValue(
      'saleType',
      this.saleTypes.get(product.id_sale_type)?.name
    );
    product.setDataValue(
      'controlTypePublicHealth',
      this.controls.get(product.id_control_type_public_health)?.name
    );
    product.setDataValue('size', this.productSizes.get(product.id_size)?.name);
    product.setDataValue(
      'pharmaceuticalForm',
      this.productForms.get(product.id_pharmaceutical_form)?.name
    );
    product.setDataValue(
      'supplyWay',
      this.supplyWays.get(product.id_supply_way)?.name
    );
    product.setDataValue('drug', this.drugs.get(product.id_drug)?.name);
    product.setDataValue(
      'pharmacotherapeuticAction',
      this.drugActions.get(product.id_pharmaco_therapeutic_action)?.name
    );
    product.setDataValue(
      'potencyUnit',
      this.drugPotencies.get(product.id_potency_unit)?.name
    );
    product.setDataValue(
      'presentationUnit',
      this.quantities.get(product.id_presentation_unit)?.name
    );
    product.setDataValue(
      'detailDrug',
      this.drugs.get(product.id_detail_drug)?.name
    );
    product.setDataValue(
      'detailDrugPotencyUnit',
      this.drugPotencies.get(product.id_detail_drug_potency_unit)?.name
    );
  }

  private showResults(totalProducts: any[]) {
    console.log('PRODUCTOS RECIBIDOS --> ', totalProducts.length);
    console.log('PRODUCTOS ACTUALIZADOS --> ', this.productsUpdated.length);
    console.log('PRODUCTOS CREADOS --> ', this.productsCreated.length);
    console.log('PRODUCTOS ACTIVADOS --> ', this.productsActivated.length);
    console.log('PRODUCTOS DESACTIVADOS --> ', this.productsDeactivated.length);
    console.log(
      'PRODUCTOS NO HOMOLOGADOS --> ',
      this.productsNotHomologated.length
    );
    console.log(
      'PRODUCTOS HOMOLOGADOS NO ACTUALIZABLES --> ',
      this.productsHomologatedNonUpgradeable.length
    );
  }

  private async updatePriceProduct(
    product: ProductModel,
    savedProduct: ProductModel,
    transaction: Transaction
  ) {
    try {
      if (product.id_sale_type == 1 || product.id_sale_type == 7) {
        addRowCSVGenerator(
          ProductMapper.toHomologatedNonUpgradeableProductCSV({
            alfabetaId: product.id_alfabeta,
            localId: savedProduct.getDataValue('base').id_pharol,
            saleTypeId: product.id_sale_type,
          }),
          this.PATH_STORAGE,
          this.csvFilesNames[5]
        );
        this.productsHomologatedNonUpgradeable.push(savedProduct);
        return false;
      }
      if (
        product.price == savedProduct.price &&
        savedProduct.getDataValue('base').price
      )
        return false;

      await this.updateBaseRepository.update(
        product.id_alfabeta,
        { price: product.price },
        transaction
      );

      return await this.updateProductRepository.update(
        savedProduct.id,
        { price: product.price },
        transaction
      );
    } catch (error) {
      throwDatabaseError(
        'ERROR AL ACTUALIZAR EL PRECIO DEL PRODUCTO: ' + savedProduct.id
      );
    }
  }

  private async updateStatus(
    id: string,
    status: string,
    transaction: Transaction
  ) {
    try {
      return this.updateProductRepository.update(
        id,
        {
          status,
        },
        transaction
      );
    } catch (error) {
      console.error('ERROR AL ACTUALIZAR EL ESTADO DEL PRODUCTO: ' + id);
    }
  }

  private sendEmail(totalProducts: any[]) {
    const date = new Date();
    const dateInChile = date.toLocaleString('en-US', {
      timeZone: 'America/Santiago',
    });
    const attachments = [];

    if (this.productsCreated.length) {
      attachments.push({
        filename: this.csvFilesNames[0],
        path: `${this.PATH_STORAGE}/${this.csvFilesNames[0]}`,
      });
    }

    if (this.productsUpdated.length) {
      attachments.push({
        filename: this.csvFilesNames[1],
        path: `${this.PATH_STORAGE}/${this.csvFilesNames[1]}`,
      });
    }

    if (this.productsActivated.length) {
      attachments.push({
        filename: this.csvFilesNames[2],
        path: `${this.PATH_STORAGE}/${this.csvFilesNames[2]}`,
      });
    }

    if (this.productsDeactivated.length) {
      attachments.push({
        filename: this.csvFilesNames[3],
        path: `${this.PATH_STORAGE}/${this.csvFilesNames[3]}`,
      });
    }

    if (this.productsNotHomologated.length) {
      attachments.push({
        filename: this.csvFilesNames[4],
        path: `${this.PATH_STORAGE}/${this.csvFilesNames[4]}`,
      });
    }

    if (this.productsHomologatedNonUpgradeable.length) {
      attachments.push({
        filename: this.csvFilesNames[5],
        path: `${this.PATH_STORAGE}/${this.csvFilesNames[5]}`,
      });
    }

    const templateMail = resultFilesTemplate({
      date: dateInChile,
      totalProducts: totalProducts.length,
      newProducts: this.productsCreated.length,
      updatedProducts: this.productsUpdated.length,
      activatedProducts: this.productsActivated.length,
      deactivatedProducts: this.productsDeactivated.length,
      notHomologatedProducts: this.productsNotHomologated.length,
      homologatedProductsNonUpgraded:
        this.productsHomologatedNonUpgradeable.length,
    });
    this.mailerService.sendEmail({
      destinyEmail: [
        'vinrast@gmail.com',
        // 'diego.carciente@pharol.cl',
        // 'sistemas@benvida.com.ar',
        // 'pmartinez@benvida.com.ar',
      ],
      html: templateMail,
      subject: 'Resultados de la actualización de productos',
      attachments,
    });
  }
}
