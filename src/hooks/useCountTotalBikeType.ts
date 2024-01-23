import { TCalendarData } from "../types/app-types";

export const useCountTotalBikeType = (data: TCalendarData): any => {
  const bikeTypeResults: Record<string, number> = {};
  const bikeTypeResultsByMonthIndex: Record<string, object> = {};

  for (const yearKey in data) {
    const monthsData = data[yearKey];

    monthsData.forEach((monthEntry) => {
      for (const monthKey in monthEntry) {
        const events = monthEntry[monthKey];

        events.forEach((nestedEvent) => {
          if (nestedEvent && Object.keys(nestedEvent).length > 0) {
            Object.keys(nestedEvent).forEach((nestedKey) => {
              const nestedBikeType = nestedEvent[nestedKey].filter(
                (event) => event && event.bikeType,
              );

              nestedBikeType.forEach((event) => {
                let bikeType = event.bikeType;

                if (!bikeTypeResults[bikeType]) {
                  bikeTypeResults[bikeType] = 0;
                }
                bikeTypeResults[bikeType]++;
              });
            });
          }
        });
      }
    });
  }

  return { bikeTypeResultsByMonthIndex, bikeTypeResults };
};
