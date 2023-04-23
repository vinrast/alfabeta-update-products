export const toBoolean = (param: any) => {
  if (param?.toLowerCase?.() === 'true') return true;
  if (param?.toLowerCase?.() === 'false') return false;
  return param;
};
