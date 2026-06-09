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

//wartosc number konwertowana na string
export const convertObjectWithNumbersToString = (object: {
  hour: string;
  minutes: string;
  seconds: string;
}): string | undefined => {
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

//wartości w obiekcie, które są pustą wartościa albo undefined są przekonwertowane na null
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

//usuwa klucze w obiekcie, w ktorych wartości mają wartość null
export const removeNullValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== "" && v !== 0),
  ) as Partial<T>;
};

//zwraca wartośći, które w obiekcie z parametru nr zostały zmienione
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

//sprawdza czy wszystkie wartości w obiekcie spełniaja warunki takie jak pusty string, null, 0, undefined
export const isDurationEmpty = (duration: Record<any, any>) => {
  if (!duration || typeof duration !== "object") {
    return true;
  }
  const values = Object.values(duration);
  return values.every(
    (v) => v === "" || v === 0 || v === null || v === undefined,
  );
};
