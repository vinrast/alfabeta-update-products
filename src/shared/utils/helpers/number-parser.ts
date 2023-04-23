import { isString } from "../validators";

export const numberParser = (type: 'int' | 'float', value: any): number => {
  if (!isString(value)) return null;
  switch(type) {
    case 'int':
      return parseInt(value);
    case 'float':
      return parseFloat(value);
    default:
      return null;
  }
};
