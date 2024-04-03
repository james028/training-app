import { t } from "i18next";

//tablica miesięcy
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

//
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

//indeksy miesięcy
export const monthObject = {
  1: "Styczeń",
  2: "Luty",
  3: "Marzec",
  4: "Kwiecień",
  5: "Maj",
  6: "Czerwiec",
  7: "Lipiec",
  8: "Sierpień",
  9: "Wrzesień",
  10: "Październik",
  11: "Listopad",
  12: "Grudzień",
};
