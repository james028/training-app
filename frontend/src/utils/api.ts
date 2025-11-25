// Obsługa błędów, headers, itp.

// If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
export const get = (obj: any, path: string, defValue?: any) => {
  if (!path) return;

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  // @ts-ignore
  const result = pathArray?.reduce(
    (prevObj: { [x: string]: any }, key: string | number) =>
      prevObj && prevObj[key],
    obj,
  );
  return result === undefined ? defValue : result;
};
