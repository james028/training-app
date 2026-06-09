import React, { useMemo } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";
import { DateTime } from "luxon";
import { CalendarDaysProps, DailyTasksMap } from "../../../types";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { FlattenedTask } from "../Calendar";
import { useActivityTypes } from "../../../hooks/useActivity";

const CalendarDays = ({ calendarData, year, month }: CalendarDaysProps) => {
  const { data, isError, error } = useActivityTypes();
  const activityData = data?.data ?? [];
  useToastError(isError, error, "test calendar zle poszlo");

  //utils
  const getBlankDaysBeforeMonth = (year: number, month: number): number => {
    const firstDayOfMonth = DateTime.local(year, month, 1);
    const weekdayIndex = firstDayOfMonth.weekday;

    return weekdayIndex - 1;
  };

  //utils
  const getBlankDaysAfterMonth = (year: number, month: number): number => {
    const lastDayOfMonth = DateTime.local(year, month, 1).endOf("month");
    const weekdayIndex = lastDayOfMonth.weekday;
    return 7 - weekdayIndex;
  };

  const createBlankDaysInMonth = (length: number): string[] => {
    return Array.from({ length }).map((_) => "");
  };

  const generateDaysForMonth = (year: number, month: number): string[] => {
    const daysArray: string[] = [];

    let currentDay = DateTime.local(year, month, 1);

    if (!currentDay.isValid) {
      return [];
    }

    const daysInMonth = currentDay.daysInMonth;

    for (let i = 0; i < daysInMonth; i++) {
      const dateKey = currentDay.toISODate();

      if (dateKey) {
        daysArray.push(dateKey);
      }
      currentDay = currentDay.plus({ days: 1 });
    }

    const daysBefore = createBlankDaysInMonth(
      getBlankDaysBeforeMonth(year, month),
    );
    const daysAfter = createBlankDaysInMonth(
      getBlankDaysAfterMonth(year, month),
    );
    return [...daysBefore, ...daysArray, ...daysAfter];
  };

  const normalizeTasksForCalendar = (tasks: FlattenedTask[]): DailyTasksMap => {
    if (!tasks || tasks.length === 0) {
      return {};
    }

    return tasks.reduce((acc, task) => {
      const dateKey = task.fullDateTime.substring(0, 10);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(task as any);

      return acc;
    }, {} as DailyTasksMap);
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

    return (
      <CalendarDay
        data={tasksData}
        day={day}
        isEmpty={!date}
        activityData={activityData}
      />
    );
  };

  return (
    <>
      <div className="flex flex-wrap border-t border-l bg-gray-50">
        {daysArray.map((dateKey, index) => {
          const monthPrefix = `${year}-${month}`;
          const stableKey = `${monthPrefix}-${index}`;

          return (
            <React.Fragment key={stableKey}>
              {renderDay(dateKey)}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CalendarDays;
