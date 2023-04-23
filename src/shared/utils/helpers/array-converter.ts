import { isArray } from "../validators";

export const toArray = (value: any): Array<any> => {
  if (value === null || value === undefined) return null;
  return isArray(value) ? value : [value];
};
