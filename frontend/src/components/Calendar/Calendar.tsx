import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import useGetApi from "../../hooks/api/get/useApiGet";
import { API_ENDPOINTS, URL } from "../../constants";
import { useToastError } from "../../hooks/useToastError/useToastError";
import Loading from "../shared/Loading/Loading";
import { useAppContext } from "../../appContext/appContext";
import { CALENDAR_KEYS } from "../../constants/query-keys";

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

interface DayEntry {
  id: string;
  dayNumber: number;
  tasks: Task[];
}

interface CalendarDataAPI {
  id: string;
  userId: number;
  yearMonthKey: string;
  days: DayEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface FlattenedTask extends Omit<Task, "dateTime"> {
  fullDateTime: string;
}

interface ConvertedCalendarData {
  year: number;
  month: number;
  tasks: FlattenedTask[];
}

export const convertCalendarDataToFlatTasks = (
  apiData: CalendarDataAPI,
): ConvertedCalendarData => {
  let yearMonthKey = apiData.yearMonthKey;

  if (!yearMonthKey || !yearMonthKey.includes("-")) {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      tasks: [],
    };
  }

  const [yearStr, monthStr] = apiData.yearMonthKey.split("-") || [];
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  const flatTasks: FlattenedTask[] = apiData.days.flatMap(
    (dayEntry: { dayNumber: number; tasks: Task[] }) => {
      const dayNumberPadded = dayEntry.dayNumber.toString().padStart(2, "0");
      const fullDateKey = `${yearStr}-${monthStr}-${dayNumberPadded}`;

      return dayEntry.tasks.map((task) => {
        return {
          ...task,
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
  const token = auth?.data?.accessToken;

  const paramsFilters = { year, month };
  const {
    data: calendarData,
    isLoading,
    isError,
    error,
  } = useGetApi<any>({
    link: `${URL}${API_ENDPOINTS.CALENDAR.MONTHLY_LIST}`,
    queryKey: CALENDAR_KEYS.calendarMonthlyList(paramsFilters),
    paramsObject: paramsFilters,
    headers: { Authorization: `Bearer ${token}` },
    // options: {
    //   refetchOnWindowFocus: false,
    // },
  });
  useToastError(isError, error);

  const data = calendarData ?? [];
  const convertedCalendarData = convertCalendarDataToFlatTasks(data);
  const { tasks } = convertedCalendarData;

  if (isLoading) {
    return <Loading />;
  }

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
