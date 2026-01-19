import React, { useMemo } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";
import { DateTime } from "luxon";
import {
  CalendarDaysProps,
  DailyTasksMap,
  TrainingTypeResponse,
} from "../../../types";
import useGetApi from "../../../hooks/api/get/useApiGet";
import { API_ENDPOINTS, URL } from "../../../constants";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { FlattenedTask } from "../Calendar";
import { ACTIVITY_KEYS } from "../../../constants/query-keys";

const CalendarDays = ({ calendarData, year, month }: CalendarDaysProps) => {
  //tu zmieniać
  const {
    data: trainingTypeData,
    isError,
    error,
  } = useGetApi<TrainingTypeResponse>({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.LIST}`,
    queryKey: ACTIVITY_KEYS.activityTypeList(),
  });

  const trainingDataColor = trainingTypeData?.data ?? [];
  useToastError(isError, error);

  const getBlankDaysBeforeMonth = (year: number, month: number): number => {
    const firstDayOfMonth = DateTime.local(year, month, 1);
    const weekdayIndex = firstDayOfMonth.weekday; // np. 5 dla piątku
    // 3. Obliczenie pustych dni:
    // - Jeśli miesiąc zaczyna się w poniedziałek (weekdayIndex = 1), pustych dni jest 0. (1 - 1 = 0)
    // - Jeśli miesiąc zaczyna się w piątek (weekdayIndex = 5), pustych dni jest 4. (5 - 1 = 4)
    return weekdayIndex - 1;
  };

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
      // Formatowanie daty do klucza YYYY-MM-DD (format akceptowany przez backend i frontend)
      const dateKey = currentDay.toISODate(); // np. "2025-11-01"

      if (dateKey) {
        daysArray.push(dateKey);
      }

      // Przejście do następnego dnia za pomocą metody plus()
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

  const normalizeTasksForCalendar = (tasks: FlattenedTask[]) => {
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
    //poprawić, tu od poczatku
    return normalizeTasksForCalendar(calendarData.map((item) => ({ ...item })));
  }, [calendarData]);

  const renderDay = (date: string) => {
    const tasksData = tasksByDay[date] || [];

    const day = getDayNumberFromDateKey(date);

    return (
      <CalendarDay
        data={tasksData}
        day={day}
        isEmpty={!date}
        trainingDataColor={trainingDataColor}
      />
    );
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
