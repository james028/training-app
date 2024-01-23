import React from "react";
import SumByMonthsChart from "./SumByMonthsChart/SumByMonthsChart";
import { TCalendarData, TDay, TMonth } from "../../types/app-types";
import { calendarData } from "../../mock/mock";

const Charts = () => {
  const countTotalNestedEventsPerMonth = (
    data: TCalendarData,
  ): Record<string, number> => {
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

    return result;
  };

  const createEventsPerMonthArray = (): number[] => {
    const results = countTotalNestedEventsPerMonth(calendarData ?? {});

    return Object.values(results).map((event) => +event);
  };
  // @ts-ignore
  // @ts-ignore
  const countNestedEventsByType = (data) => {
    const result = {};

    const result2: any = [];

    for (const yearKey in data) {
      const monthsData = data[yearKey];
      // @ts-ignore
      monthsData.forEach((monthEntry) => {
        for (const monthKey in monthEntry) {
          const events = monthEntry[monthKey];

          // Zagnieżdżone zdarzenia
          const obj: any = {};
          // @ts-ignore
          events.forEach((nestedEvent) => {
            if (nestedEvent && Object.keys(nestedEvent).length > 0) {
              Object.keys(nestedEvent).forEach((nestedKey) => {
                const nestedEventsOfType = nestedEvent[nestedKey].filter(
                  // @ts-ignore
                  (event) => event && event.type,
                );

                // Zlicz zagnieżdżone zdarzenia dla każdego typu
                // @ts-ignore

                nestedEventsOfType.forEach((event: { type: any }) => {
                  let eventType = event.type;

                  if (!obj[eventType]) {
                    obj[eventType] = 0;
                  }
                  obj[eventType]++;

                  // @ts-ignore
                  result[monthKey] = obj;

                  //jęsli suma wszystkich treningów
                  // if (!result[eventType]) {
                  //   // @ts-ignore
                  //   result[eventType] = 0;
                  // }
                  // // @ts-ignore
                  // result[eventType]++;
                });
              });
            }
          });
        }
      });
    }

    result2.push(result);
    console.log(result2);

    return { result2, result };
  };

  // Przykład użycia dla danego zestawu danych
  const { result, result2 } = countNestedEventsByType(calendarData);
  console.log(result, result2);

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1 gap-10 pb-20">
        <div>
          <SumByMonthsChart data={createEventsPerMonthArray()} />
        </div>
        <div>
          <SumByMonthsChart data={createEventsPerMonthArray()} />
        </div>
        <div>
          <SumByMonthsChart data={createEventsPerMonthArray()} />
        </div>
        <div>
          <SumByMonthsChart data={createEventsPerMonthArray()} />
        </div>
      </div>
    </>
  );
};

export default Charts;
