// src/
// ├── constants/
// │   ├── api.ts           // Ścieżki bazowe API, timeouty
// │   ├── index.ts         // Zbiorczy eksport
// │   └── dates.ts         // Wszystkie stałe związane z datami, miesiącami, dniami

//indeksy miesięcy
import { MonthIndex, MonthName } from "../types";
import { t } from "i18next";

//tablica miesięcy
export const months: string[] = [
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

export const monthObject: { [key in MonthIndex]: MonthName } = {
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
