import React, { useEffect, useState, useMemo } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";

import { DateTime } from "luxon";
import { TMonth, TYear } from "../../../types";
import { calendarDataForCurrentMonth } from "../../../mock/mock";

const CalendarDays = ({
  dataMonths,
  monthIndex,
  year,
  month,
}: {
  dataMonths: any;
  monthIndex: number;
  year: number;
  month: number;
}) => {
  //zmienic nazwe zmiennej
  const [monthsData, setMonthsData] = useState<any[]>([]);

  const getBlankDaysInMonth = (): number => {
    // z context
    const weekDays: string[] = [
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
      month: monthIndex,
      day: 1,
    })
      .toFormat("EEE, M/d/yyyy")
      .split(",")[0];

    return weekDays.indexOf(firstDayOfMonth);
  };

  const createBlankDaysArray = (): any[] => {
    const getBlankDaysInMonthLength = getBlankDaysInMonth();

    return Array(getBlankDaysInMonthLength)
      .fill({})
      .map((day) => {
        return {
          "00": {},
        };
      });
  };

  const createDaysInMonth = (): void => {
    const blankDaysArray = createBlankDaysArray();

    const newBlankDaysArray = [...blankDaysArray];
    const newDataMonths = [...dataMonths];
    const results: any[] = [];

    console.log(newDataMonths, "new");

    newDataMonths.forEach((item) => {
      for (const val of Object.values(item)) {
        results.push(val);
      }
    });

    console.log(results[0], "results");

    setMonthsData([
      ...newBlankDaysArray,
      //...results[0]
    ]);
  };

  useEffect(() => {
    getBlankDaysInMonth();
    createBlankDaysArray();
    createDaysInMonth();
  }, [monthIndex]);

  console.log(monthsData, "monthsData");

  type DailyTasksMap = {
    [dateKey: string]: any[];
  };

  const normalizeTasksForCalendar = (tasks: any[]): DailyTasksMap => {
    if (!tasks || tasks.length === 0) {
      return {};
    }

    //console.log(tasks && (tasks as any)?.(tasks as any), "w normalize" + "");
    //console.log(tasks && (tasks as any)?.(tasks as any), "w normalize" + "");
    //@ts-ignore
    //const tasksData = (tasks && (tasks as any)?.(tasks as any)) || [];

    // Używamy metody reduce do iteracji i budowania mapy
    return tasks.reduce((acc: any, task: any) => {
      // 1. Ekstrakcja klucza dnia: YYYY-MM-DD
      // Używamy substring, aby wyciąć tylko datę (bez czasu 'T' i strefy czasowej 'Z')
      const dateKey = task.fullDateTime.substring(0, 10); // np. "2025-11-28"

      // 2. Grupowanie
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      // Opcjonalnie: Można tu posortować zadania po czasie
      acc[dateKey].push(task);

      return acc;
    }, {} as DailyTasksMap);
  };

  const generateDaysForMonth = (year: number, month: number): string[] => {
    const daysArray: string[] = [];

    let currentDay = DateTime.local(year, month, 1);

    // Jeśli miesiąc jest poza zakresem (np. 13), Luxon tworzy nieprawidłowy obiekt
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

    return daysArray;
  };

  const daysArray = generateDaysForMonth(year, month);

  const tasks = calendarDataForCurrentMonth || [];
  // 2. Normalizujemy dane API do mapy (O(1) lookup)
  const tasksByDay = useMemo(() => {
    return normalizeTasksForCalendar(tasks.tasks);
  }, [tasks]);

  const renderDay = (date: string) => {
    // date np. '2025-11-28'
    const tasks = tasksByDay[date] || []; // Pobranie zadań na dany dzień

    console.log(tasks);

    return (
      <React.Fragment>
        {/*{tasks.map((task, index) => (*/}
        <CalendarDay data={tasks} day={String(1)} />
        {/*))}*/}
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-wrap border-t border-l">
      {daysArray.map((dateKey, index) => (
        <React.Fragment key={dateKey}>
          {/*{Object.keys(month ?? {}).map((day: string) => {*/}
          {/*  return <CalendarDay key={day} data={month[day]} day={day} />;*/}
          {/*})}*/}
          <React.Fragment>{renderDay(dateKey)}</React.Fragment>
        </React.Fragment>
      ))}
      {/*{Array.from({ length: 12 }, (_, a) => {*/}
      {/*  return { a: "1S" };*/}
      {/*}).map((month: any, index: number) => {*/}
      {/*  return (*/}

      {/*  );*/}
      {/*})}*/}
    </div>
  );
};

export default CalendarDays;
