import { appendFileSync } from 'fs';

export const addRowCSVGenerator = (
  row: any,
  pathStorage: string,
  fileName: string
): void => {
  const path = `${pathStorage}/${fileName}`;
  appendFileSync(path, row);
};
