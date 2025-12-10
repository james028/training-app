import React, { useEffect, useState, useMemo, useCallback } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";

import { DateTime } from "luxon";
import { TMonth, TYear } from "../../../types";
import { calendarDataForCurrentMonth } from "../../../mock/mock";

interface CalendarDaysProps {
  //otyp
  calendarData: any;
  year: number;
  month: number;
}

const CalendarDays = ({ calendarData, year, month }: CalendarDaysProps) => {
  console.log(calendarData);
  // const getBlankDaysInMonth = (year: number, month: number): number => {
  //   // z utils importować
  //   const weekDays: string[] = [
  //     "Sun",
  //     "Mon",
  //     "Tue",
  //     "Wed",
  //     "Thu",
  //     "Fri",
  //     "Sat",
  //   ];
  //
  //   const firstDayOfMonth = DateTime.fromObject({
  //     year,
  //     month,
  //     day: 1,
  //   })
  //     .toFormat("EEE, M/d/yyyy")
  //     .split(",")[0];
  //
  //   return weekDays.indexOf(firstDayOfMonth);
  // };

  const getBlankDaysInMonth = (year: number, month: number): number => {
    const firstDayOfMonth = DateTime.local(year, month, 1);
    const weekdayIndex = firstDayOfMonth.weekday; // np. 5 dla piątku
    // 3. Obliczenie pustych dni:
    // - Jeśli miesiąc zaczyna się w poniedziałek (weekdayIndex = 1), pustych dni jest 0. (1 - 1 = 0)
    // - Jeśli miesiąc zaczyna się w piątek (weekdayIndex = 5), pustych dni jest 4. (5 - 1 = 4)
    return weekdayIndex - 1;
  };
  getBlankDaysInMonth(year, month);

  const createBlankDaysInMonth = (length: number): string[] => {
    return Array.from({ length }).map((_) => "");
  };
  //
  // const createBlankDaysArray = (): any[] => {
  //   const getBlankDaysInMonthLength = getBlankDaysInMonth();
  //
  //   return Array(getBlankDaysInMonthLength)
  //     .fill({})
  //     .map((day) => {
  //       return {
  //         "00": {},
  //       };
  //     });
  // };
  //
  // const createDaysInMonth = (): void => {
  //   const blankDaysArray = createBlankDaysArray();
  //
  //   const newBlankDaysArray = [...blankDaysArray];
  //   const newDataMonths = [...dataMonths];
  //   const results: any[] = [];
  //
  //   console.log(newDataMonths, "new");
  //
  //   newDataMonths.forEach((item) => {
  //     for (const val of Object.values(item)) {
  //       results.push(val);
  //     }
  //   });
  //
  //   console.log(results[0], "results");
  //
  //   setMonthsData([
  //     ...newBlankDaysArray,
  //     //...results[0]
  //   ]);
  // };
  //
  // useEffect(() => {
  //   getBlankDaysInMonth();
  //   createBlankDaysArray();
  //   createDaysInMonth();
  // }, [monthIndex]);

  //console.log(monthsData, "monthsData");

  type DailyTasksMap = {
    [dateKey: string]: any[];
  };

  const normalizeTasksForCalendar = (tasks: any[]): any => {
    if (!tasks || tasks.length === 0) {
      return {};
    }

    return tasks.reduce((acc: any, task: any) => {
      const dateKey = task.fullDateTime.substring(0, 10);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(task);

      return acc;
    }, {} as DailyTasksMap);
  };

  const generateDaysForMonth = (year: number, month: number): string[] => {
    const daysArray: string[] = [];

    let currentDay = DateTime.local(year, month, 1);

    if (!currentDay.isValid) {
      console.error("Błędne dane wejściowe dla roku/miesiąca:", year, month);
      return [];
    }

    const daysInMonth = currentDay.daysInMonth;

    for (let i = 0; i < daysInMonth; i++) {
      // Formatowanie daty do klucza YYYY-MM-DD (format akceptowany przez backend i frontend)
      const dateKey = currentDay.toISODate(); // np. "2025-11-01"

      if (dateKey) {
        daysArray.push(dateKey);
      }

      // Przejście do następnego dnia za pomocą metody plus()
      currentDay = currentDay.plus({ days: 1 });
    }

    return [
      ...createBlankDaysInMonth(getBlankDaysInMonth(2025, 11)),
      ...daysArray,
    ];
  };

  const getDayNumberFromDateKey = (dateKey: string | null): string | null => {
    if (!dateKey || dateKey.length < 10) {
      return null;
    }
    const dateObject = DateTime.fromISO(dateKey);

    if (!dateObject.isValid) {
      return null;
    }
    return dateObject.toFormat("dd");
  };

  const daysArray = generateDaysForMonth(year, month);

  const tasksByDay = useMemo(() => {
    return normalizeTasksForCalendar(calendarData);
  }, [calendarData]);

  const renderDay = (date: string) => {
    const tasksData = tasksByDay[date] || [];

    const day = getDayNumberFromDateKey(date);

    return <CalendarDay data={tasksData} day={day} isEmpty={!date} />;
  };

  return (
    <div className="flex flex-wrap border-t border-l bg-gray-50">
      {daysArray.map((dateKey, index) => {
        const monthPrefix = `${year}-${month}`;
        const stableKey = `${monthPrefix}-${index}`;

        return (
          <React.Fragment key={stableKey}>{renderDay(dateKey)}</React.Fragment>
        );
      })}
    </div>
  );
};

export default CalendarDays;
