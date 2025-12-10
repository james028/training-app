import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import { calendarDataForCurrentMonth } from "../../mock/mock";
import { useAppContext } from "../../appContext/appContext";
import useGetApi from "../../hooks/api/get/useApiGet";
import { URL } from "../../constants";
import { TDay } from "../../types";

interface CalendarApiResponse {
  year: number;
  month: number;
  tasks: TDay[];
}

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();

  const link = "api/training-type/list";
  const link2 = "api/calendar/list";
  const { data: calendarData } = useGetApi<CalendarApiResponse>({
    url: `${URL}api/calendar/list`,
    queryKey: ["calendarDataList"],
    //tu bedzie zapytanie z paramsami
    //params: { year, month },
  });

  //console.log(calendarData);

  const incrementMonth = () => {
    //tu bedzie zapytanie
    setMonthIndex((prev: number) => prev + 1);
  };

  const decrementMonth = () => {
    //tu bedzie zapytanie
    setMonthIndex((prev: number) => prev - 1);
  };

  const tasks = calendarData?.tasks ?? [];
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
