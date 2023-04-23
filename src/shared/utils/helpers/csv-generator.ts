import { appendFileSync } from 'fs';

export const csvGeneratorFile = (
  headers: string[],
  product: any[],
  pathStorage: string,
  fileName: string
): boolean => {
  try {
    const path = `${pathStorage}/${fileName}`;
    let headerRow = '';
    let row = '';

    headers.forEach((header, index) => {
      if (index === headers.length - 1) {
        headerRow += header + '\n';
      } else {
        headerRow += header + ',';
      }
    });
    appendFileSync(path, headerRow);

    product.forEach((product) => {
      const productDtoKeys = Object.keys(product);
      productDtoKeys.forEach((key, index) => {
        if (productDtoKeys.length - 1 === index) {
          row += product[key] + '\n';
        } else {
          row += product[key] + ',';
        }
      });
      appendFileSync(path, row);



    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
