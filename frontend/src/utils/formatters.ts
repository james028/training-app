// src/
// └── utils/
//     ├── __tests__/      // Opcjonalnie: Testy dla funkcji utils
// │   └── formatters.test.ts
//     ├── api.ts          // Obsługa błędów, headers, itp.
// ├── arrays.ts       // Operacje na tablicach
// ├── formatters.ts   // Formatowanie wartości
// ├── index.ts        // Plik eksportujący zbiorczo (dla czystszych importów)
// ├── time.ts         // Złożone operacje na dacie/czasie
// └── validators.ts   // Walidacja danych

import { DateTime } from "luxon";
import { DefaultValidity } from "luxon/src/_util";

export const convertObjectWithNumbersToString = (
  object:
    | string
    | {
        hour: string;
        minutes: string;
        seconds: string;
      }
    | DateTime<DefaultValidity>
    | undefined
    | number,
): string | undefined => {
  if (!object) {
    return;
  }

  return Object.values(object)
    .map((duration) => duration.toString().padStart(2, "0"))
    .join(":");
};

type NormalizeEmpty<T> = {
  [K in keyof T]: T[K] extends string | undefined
    ? Exclude<T[K], ""> | null
    : T[K];
};

export function convertEmptyValuesIntoNull<T extends Record<string, unknown>>(
  data: T,
): NormalizeEmpty<T> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === "" || value === undefined ? null : value,
    ]),
  ) as NormalizeEmpty<T>;
}

export const removeNullValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== "" && v !== 0),
  ) as Partial<T>;
};

export const getDirtyValues = <T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, any>>, // 'any' bo dirtyFields może być obiektem dla zagnieżdżonych pól
  allValues: T,
): Partial<T> => {
  return (Object.keys(dirtyFields) as Array<keyof T>).reduce((acc, key) => {
    if (dirtyFields[key]) {
      acc[key] = allValues[key];
    }
    return acc;
  }, {} as Partial<T>);
};
