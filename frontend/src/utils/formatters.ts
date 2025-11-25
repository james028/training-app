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

// Formatowanie wartości

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
