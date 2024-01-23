import { TCalendarData } from "../types/app-types";

export const countNestedEventsByType = (
  data: TCalendarData,
): { resultsEventArray: any; resultByMonthIndex: any; result: any } => {
  const result: Record<string, number> = {};
  const resultByMonthIndex: Record<string, object> = {};
  const resultsEventArray: any = [];

  for (const yearKey in data) {
    const monthsData = data[yearKey];

    monthsData.forEach((monthEntry) => {
      for (const monthKey in monthEntry) {
        const events = monthEntry[monthKey];

        const obj: any = {};

        events.forEach((nestedEvent) => {
          if (nestedEvent && Object.keys(nestedEvent).length > 0) {
            Object.keys(nestedEvent).forEach((nestedKey) => {
              const nestedEventsOfType = nestedEvent[nestedKey].filter(
                (event) => event && event.type,
              );

              nestedEventsOfType.forEach((event: { type: any }) => {
                let eventType = event.type;

                if (!obj[eventType]) {
                  obj[eventType] = 0;
                }
                obj[eventType]++;

                resultByMonthIndex[monthKey] = obj;

                //jęsli suma wszystkich treningów
                if (!result[eventType]) {
                  result[eventType] = 0;
                }
                result[eventType]++;
              });
            });
          }
        });
      }
    });
  }

  resultsEventArray.push(resultByMonthIndex);

  return { resultsEventArray, resultByMonthIndex, result };
};
