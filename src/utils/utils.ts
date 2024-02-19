import { t } from "i18next";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((month) => t(month));

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
