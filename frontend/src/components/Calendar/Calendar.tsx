import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
//import { useAppContext } from "../../appContext/appContext";
import useGetApi from "../../hooks/api/get/useApiGet";
import { URL } from "../../constants";
import { TDay } from "../../types";
import { useToastError } from "../../hooks/useToastError/useToastError";

interface CalendarApiResponse {
  year: number;
  month: number;
  tasks: TDay[];
}

const Calendar = () => {
  //const { monthIndex, setMonthIndex } = useAppContext();

  const link = "api/calendar/list";
  const {
    data: calendarData,
    //dorobić
    //isLoading,
    isError,
    error,
  } = useGetApi<CalendarApiResponse>({
    url: `${URL}${link}`,
    queryKey: ["calendarDataList"],
    //tu bedzie zapytanie z paramsami
    //params: { year, month },
  });
  useToastError(isError, error);
  const tasks = calendarData?.tasks ?? [];

  const incrementMonth = () => {
    //tu bedzie zapytanie
    //setMonthIndex((prev: number) => prev + 1);
  };

  const decrementMonth = () => {
    //tu bedzie zapytanie
    //setMonthIndex((prev: number) => prev - 1);
  };

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
