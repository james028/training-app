import { TCalendarData, TDay, TMonth } from "../types/app-types";

export const countTotalNestedEventsPerMonth = (
  data: TCalendarData,
): { resultsArray: number[] } => {
  const result: Record<string, number> = {};

  for (const yearKey in data) {
    const monthsData = data[yearKey];

    monthsData.forEach((monthEntry: Record<string, TMonth[]>) => {
      for (const monthKey in monthEntry) {
        const events = monthEntry[monthKey];

        if (!result[monthKey]) {
          result[monthKey] = 0;
        }

        events?.forEach((nestedEvent: Record<string, TDay[]>) => {
          Object.values(nestedEvent).forEach((nestedKey) => {
            result[monthKey] += nestedKey.length;
          });
        });
      }
    });
  }

  const resultsArray = Object.values(result).map((event) => +event);

  return { resultsArray };
};
