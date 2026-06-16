import { DateTime } from "luxon";
import {
  ConvertedMonthObjectMap,
  MonthDaysMap,
  MonthIndex,
  MonthName,
  MonthNameLower,
  MonthObjectMap,
} from "../../../types";
import { MONTH_NAMES_MAP } from "../../../constants";

export const useDisplayDaysByMonth = (monthValue: string) => {
  const getDays = (year: number, month: number): number => {
    return DateTime.local(year, month).daysInMonth ?? 0;
  };

  const convertObjectToLowerCase = (
    months: MonthObjectMap,
  ): ConvertedMonthObjectMap => {
    const convertedMonthObject = {} as ConvertedMonthObjectMap;
    for (const keyString in months) {
      const key = parseInt(keyString, 10) as MonthIndex;
      const value = months[key];

      convertedMonthObject[key] = value.toLowerCase() as MonthNameLower;
    }
    return convertedMonthObject;
  };

  const createObjectMonthDays = (): Partial<MonthDaysMap> => {
    const currentDate = DateTime.now();
    const { year } = currentDate.toObject();
    const monthDays: Partial<MonthDaysMap> = {};

    for (let i = 1; i <= 12; i++) {
      const monthName = DateTime.local(year, i).monthLong as MonthName;
      const keyLower = monthName.toLowerCase() as MonthNameLower;
      monthDays[keyLower] = getDays(year, i);
    }

    console.log(monthDays, "days");
    return monthDays;
  };

  const getDaysByMonth = (): { value: string; name: string }[] => {
    //const { month: monthValue } = watch();
    const monthKey = parseInt(monthValue, 10);

    const convertedObjectMonthDays = createObjectMonthDays();

    const convertedObjectToLowerCase =
      convertObjectToLowerCase(MONTH_NAMES_MAP);

    const monthName =
      convertedObjectToLowerCase[
        monthKey as keyof typeof convertedObjectToLowerCase
      ];
    console.log(
      convertedObjectMonthDays,
      convertedObjectMonthDays[monthName],
      "converted",
    );

    const days = monthValue ? convertedObjectMonthDays[monthName] : [];

    console.log(days, "days");

    return days
      ? Array(days)
          .fill(0)
          .map((_: any, number: number) => {
            const value = number + 1;
            return {
              value: String(value).padStart(2, "0"),
              name: String(value),
            };
          })
      : [];
  };

  return {
    getDaysByMonth,
  };
};
