import React, { useEffect, useState } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";
import { TMonth, TYear } from "../../../types/app-types";

import { DateTime } from "luxon";

const CalendarDays = ({
  dataMonths,
  monthIndex,
}: {
  dataMonths: TYear[];
  monthIndex: number;
}) => {
  //zmienic nazwe zmiennej
  const [monthsData, setMonthsData] = useState<any[]>([]);

  const getBlankDaysInMonth = (): number => {
    // z context
    const weekdays2: string[] = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const currentDate = DateTime.now();
    const { year } = currentDate.toObject();

    const firstDayOfMonth = DateTime.fromObject({
      year,
      month: monthIndex + 1,
      day: 1,
    })
      .toFormat("EEE, M/d/yyyy")
      .split(",")[0];

    return weekdays2.indexOf(firstDayOfMonth);
  };

  const createBlankDaysArray = (): any[] => {
    const getBlankDaysInMonthLength = getBlankDaysInMonth();

    return Array(getBlankDaysInMonthLength)
      .fill({})
      .map((day) => {
        return {
          ["00"]: {},
        };
      });
  };
  const createDaysInMonth = (): void => {
    const blankDaysArray = createBlankDaysArray();

    const newBlankDaysArray = [...blankDaysArray];
    const newDataMonths = [...dataMonths];
    const results: any[] = [];

    newDataMonths.forEach((item) => {
      for (const val of Object.values(item)) {
        results.push(val);
      }
    });

    setMonthsData([...newBlankDaysArray, ...results[monthIndex]]);
  };

  useEffect(() => {
    getBlankDaysInMonth();
    createBlankDaysArray();
    createDaysInMonth();
  }, [monthIndex]);

  console.log(monthsData);

  return (
    <div className="flex flex-wrap border-t border-l">
      {monthsData?.length > 0 &&
        monthsData.map((month: TMonth, index: number) => {
          return (
            <React.Fragment key={index}>
              {Object.keys(month ?? {}).map((day: string) => {
                return <CalendarDay key={day} data={month[day]} day={day} />;
              })}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default CalendarDays;
