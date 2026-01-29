import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import useGetApi from "../../hooks/api/get/useApiGet";
import { API_ENDPOINTS, URL } from "../../constants";
import { TDay } from "../../types";
import { useToastError } from "../../hooks/useToastError/useToastError";
import Loading from "../shared/Loading/Loading";
import { useAppContext } from "../../appContext/appContext";
import { CALEDAR_KEYS } from "../../constants/query-keys";
import { Navigate } from "react-router-dom";

export interface Activity {
  id: string;
  type: string;
  activityName: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  activity: Activity;
  duration: string;
  activityDate: string;
  title?: string;
  description?: string;
  bikeType?: string;
}

export interface CalendarDay {
  id: string;
  dayNumber: number;
  tasks: Task[];
}

export interface Calendar {
  id: string;
  userId: string;
  yearMonthKey?: string;
  days: CalendarDay[];
  createdAt: string;
  updatedAt: string;
}

interface CalendarApiResponse {
  year: number;
  month: number;
  tasks: TDay[];
}
// interface Task {
//   id: string;
//   trainingType: string;
//   duration: string;
//   title: string;
//   description: string;
//   bikeType: string;
//   bikeKilometers: number;
//   activity: any;
//   dateTime: string; // Oryginalny format ISO, np. "2025-12-15T15:16:14.420Z"
// }

interface DayEntry {
  _id: string;
  dayNumber: number;
  tasks: Task[];
}
//
interface CalendarDataAPI {
  id: string;
  userId: number;
  yearMonthKey: string; // np. "2025-12"
  days: DayEntry[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlattenedTask extends Omit<Task, "dateTime"> {
  fullDateTime: string; // Format 'YYYY-MM-DD'
}

interface ConvertedCalendarData {
  year: number;
  month: number;
  tasks: FlattenedTask[];
}

// --- Funkcja Konwertująca ---

/**
 * Konwertuje zagnieżdżone dane kalendarza z API na płaską tablicę zadań,
 * dodając pełny klucz daty (YYYY-MM-DD).
 * * @param apiData Dane zwrócone przez Mongoose/API.
 * @returns Przekształcony obiekt z rokiem, miesiącem i płaską listą zadań.
 */
export const convertCalendarDataToFlatTasks = (
  apiData: any,
): ConvertedCalendarData => {
  console.log(apiData, "1");
  //if ("yearMonthKey" in apiData) {
  let yearMonthKey = apiData.yearMonthKey;

  // 1. Rozbicie yearMonthKey na rok i miesiąc
  if (!yearMonthKey || !yearMonthKey.includes("-")) {
    // Zwróć bezpieczny, pusty obiekt, aby uniknąć awarii aplikacji
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      tasks: [],
    };
  }
  //}
  const [yearStr, monthStr] = apiData.yearMonthKey.split("-") || [];
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  // 2. Spłaszczanie i mapowanie zadań
  const flatTasks: FlattenedTask[] = apiData.days.flatMap(
    (dayEntry: { dayNumber: { toString: () => string }; tasks: any[] }) => {
      // Formatuje numer dnia z wiodącym zerem (np. 5 -> 05)
      const dayNumberPadded = dayEntry.dayNumber.toString().padStart(2, "0");

      // Tworzy pełny klucz daty (YYYY-MM-DD)
      const fullDateKey = `${yearStr}-${monthStr}-${dayNumberPadded}`;

      // Mapowanie każdego zadania z danego dnia
      return dayEntry.tasks.map((task: any) => {
        const { dateTime, ...restOfTask } = task;

        return {
          ...restOfTask,
          id: task._id,
          fullDateTime: fullDateKey,
        };
      });
    },
  );

  return {
    year,
    month,
    tasks: flatTasks,
  };
};

const Calendar = () => {
  const { year, month, changeMonth, auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const paramsFilters = { year, month };
  const {
    data: calendarData,
    isLoading,
    isError,
    error,
  } = useGetApi<Calendar>({
    link: `${URL}${API_ENDPOINTS.CALENDAR.MONTHLY_LIST}`,
    queryKey: CALEDAR_KEYS.calendarMonthlyList(paramsFilters),
    paramsObject: paramsFilters,
    headers: { Authorization: `Bearer ${token}` },
  });
  useToastError(isError, error);

  const data = calendarData ?? [];
  const convertedCalendarData = convertCalendarDataToFlatTasks(data);
  const { tasks } = convertedCalendarData;

  if (isLoading) {
    return <Loading />;
  }

  //poprawić
  if (!token) return <Navigate to="/login" />;

  return (
    <div className="container mx-auto px-4 py-2 md:py-24">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CalendarHeader
          incrementMonth={() => changeMonth(1)}
          decrementMonth={() => changeMonth(-1)}
          year={year}
          month={month}
        />
        <CalendarDays calendarData={tasks} year={year} month={month} />
      </div>
    </div>
  );
};

export default Calendar;
