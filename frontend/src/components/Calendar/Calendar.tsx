import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
//import { useAppContext } from "../../appContext/appContext";
import useGetApi from "../../hooks/api/get/useApiGet";
import { URL } from "../../constants";
import { TDay } from "../../types";
import { useToastError } from "../../hooks/useToastError/useToastError";
import Loading from "../shared/Loading/Loading";

interface CalendarApiResponse {
  year: number;
  month: number;
  tasks: TDay[];
}
interface Task {
  id: string;
  trainingType: string;
  duration: string;
  title: string;
  description: string;
  bikeType: string;
  bikeKilometers: number;
  dateTime: string; // Oryginalny format ISO, np. "2025-12-15T15:16:14.420Z"
}

interface DayEntry {
  _id: string;
  dayNumber: number;
  tasks: Task[];
}

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
  apiData: CalendarDataAPI,
): ConvertedCalendarData => {
  const yearMonthKey = apiData.yearMonthKey;
  // 1. Rozbicie yearMonthKey na rok i miesiąc
  if (!yearMonthKey || !yearMonthKey.includes("-")) {
    console.error(
      "Błąd danych: brak lub nieprawidłowy format yearMonthKey",
      apiData,
    );
    // Zwróć bezpieczny, pusty obiekt, aby uniknąć awarii aplikacji
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      tasks: [],
    };
  }
  const [yearStr, monthStr] = apiData.yearMonthKey.split("-") || [];
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  // 2. Spłaszczanie i mapowanie zadań
  const flatTasks: FlattenedTask[] = apiData.days.flatMap((dayEntry) => {
    // Formatuje numer dnia z wiodącym zerem (np. 5 -> 05)
    const dayNumberPadded = dayEntry.dayNumber.toString().padStart(2, "0");

    // Tworzy pełny klucz daty (YYYY-MM-DD)
    const fullDateKey = `${yearStr}-${monthStr}-${dayNumberPadded}`;

    // Mapowanie każdego zadania z danego dnia
    return dayEntry.tasks.map((task: any) => {
      // Tworzymy kopię zadania, usuwając oryginalne 'dateTime'
      // i dodając 'fullDateTime'

      console.log(task, "!!!!!!!!!!!");
      const { dateTime, ...restOfTask } = task;

      return {
        ...restOfTask,
        id: task._id,
        fullDateTime: fullDateKey, // Dodajemy '2025-12-15'
      } as any;
    });
  });

  console.log(flatTasks, "flat");

  // 3. Zwrócenie oczekiwanej struktury
  return {
    year,
    month,
    tasks: flatTasks,
  };
};

const Calendar = () => {
  //const { monthIndex, setMonthIndex } = useAppContext();

  const month = 12;
  const year = 2025;
  const link = "api/calendar/list";
  const {
    data: calendarData,
    isLoading,
    isError,
    error,
  } = useGetApi<any>({
    url: `${URL}${link}`,
    queryKey: ["calendarDataList"],
    //tu bedzie zapytanie z paramsami
    paramsObject: { year, month },
  });
  useToastError(isError, error);
  const data = calendarData ?? [];
  const convertedCalendarData = convertCalendarDataToFlatTasks(data);

  console.log(convertedCalendarData);
  const { tasks } = convertedCalendarData;

  console.log(tasks);

  const incrementMonth = () => {
    //tu bedzie zapytanie
    //setMonthIndex((prev: number) => prev + 1);
  };

  const decrementMonth = () => {
    //tu bedzie zapytanie
    //setMonthIndex((prev: number) => prev - 1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-2 md:py-24">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CalendarHeader
          incrementMonth={incrementMonth}
          decrementMonth={decrementMonth}
          year={2025}
          month={12}
        />
        <CalendarDays calendarData={tasks} year={2025} month={12} />
      </div>
    </div>
  );
};

export default Calendar;
