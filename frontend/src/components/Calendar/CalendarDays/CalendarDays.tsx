import React, { useCallback, useMemo } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";
import { DateTime } from "luxon";
import {
  ActivityType,
  CalendarDaysProps,
  DailyTasksMap,
  TrainingTypeResponse,
} from "../../../types";
import useGetApi from "../../../hooks/api/get/useApiGet";
import { API_ENDPOINTS, URL } from "../../../constants";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { FlattenedTask } from "../Calendar";
import { ACTIVITY_KEYS } from "../../../constants/query-keys";
import { ApiResponse } from "../../TrainingsType/hooks/useActivityType";
import Loading from "../../shared/Loading/Loading";
import { useActivityTypes } from "../../../hooks/useActivity";

const CalendarDays = ({ calendarData, year, month }: CalendarDaysProps) => {
  // //tu zmieniać
  // const {
  //   data: trainingTypeData,
  //   isError,
  //   error,
  // } = useGetApi<TrainingTypeResponse>({
  //   link: `${URL}${API_ENDPOINTS.ACTIVITIES.LIST}`,
  //   queryKey: ACTIVITY_KEYS.activityTypeList(),
  // });

  // const {
  //   data: activityTypeData,
  //   error,
  //   isError,
  // } = useGetApi<any>({
  //   link: `${URL}${API_ENDPOINTS.ACTIVITIES.LIST}`,
  //   queryKey: ACTIVITY_KEYS.activityTypeList(),
  // });
  const { data, isLoading, isError, error } = useActivityTypes();

  const activityData = data?.data ?? [];
  useToastError(isError, error, "test calendar zle poszlo");

  //utils
  const getBlankDaysBeforeMonth = (year: number, month: number): number => {
    const firstDayOfMonth = DateTime.local(year, month, 1);
    const weekdayIndex = firstDayOfMonth.weekday; // np. 5 dla piątku
    // 3. Obliczenie pustych dni:
    // - Jeśli miesiąc zaczyna się w poniedziałek (weekdayIndex = 1), pustych dni jest 0. (1 - 1 = 0)
    // - Jeśli miesiąc zaczyna się w piątek (weekdayIndex = 5), pustych dni jest 4. (5 - 1 = 4)
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

  // const activityMap = useMemo(() => {
  //   const map = new Map<string, ActivityType>();
  //   activityData.forEach((type) => {
  //     map.set(type.id, type);
  //   });
  //   return map;
  // }, [activityData]);
  //
  // // Funkcja pomocnicza – zwraca gotowy obiekt activity lub null
  // const getActivity = useCallback(
  //   (activityId?: string) => {
  //     return activityId ? activityMap.get(activityId) : null;
  //   },
  //   [activityMap],
  // );
  //
  // const colorLookup = useMemo(() => {
  //   if (!activityData?.length) {
  //     return { default: "" };
  //   }
  //
  //   return activityData.reduce(
  //     (acc, type) => {
  //       acc[type.id] = type.color;
  //       return acc;
  //     },
  //     {} as Record<string, string>,
  //   );
  // }, [activityData]);
  //
  // const getColor = (activity: string): string => {
  //   return colorLookup[activity] || colorLookup.default;
  // };
  //
  const tasksByDay = useMemo(() => {
    return normalizeTasksForCalendar(
      calendarData.map((item) => {
        //console.log(item, "item");
        return {
          ...item,
          // activity: {
          //   ...getActivity(item.activity),
          //   //color: getColor(item.activity),
          // },
          // activity: item.activity
          //   ? {
          //       ...item.activity,
          //       color: getColor(item.activity.type),
          //     }
          //   : null,
          // activity: item.activity
          //     ? {
          //       ...item.activity,
          //       color: getColor(item.activity.type),
          //     }
          //     : null,
        };
      }),
    );
  }, [calendarData]);

  //console.log(calendarData, "calendar");
  //console.log(tasksByDay, "task by day");

  // const tasksByDay2 = useMemo(() => {
  //   //if (!calendarData.length) return [];
  //
  //   // const activityMap = new Map<string, ActivityType>(
  //   //   activityData.map((t) => [t.id, t]),
  //   // );
  //
  //   //console.log(calendarData, "cal");
  //   return normalizeTasksForCalendar(calendarData.map((item) => {
  //     console.log(item, "item");
  //     return {
  //       ...item,
  //       activity: item.activity
  //           ? {
  //             ...item.activity,
  //             color: getColor(item.activity.color),
  //           }
  //           : null,
  //     }));
  //
  //
  //
  // }, []);

  const renderDay = (date: string) => {
    const tasksData = tasksByDay[date] || [];
    const day = getDayNumberFromDateKey(date);

    console.log(tasksByDay);

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
