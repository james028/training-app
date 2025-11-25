import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import { calendarData } from "../../mock/mock";
import { useAppContext } from "../../appContext/appContext";

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();

  const incrementMonth = () => {
    setMonthIndex((prev: number) => prev + 1);
  };

  const decrementMonth = () => {
    setMonthIndex((prev: number) => prev - 1);
  };

  return (
    <div className="container mx-auto px-4 py-2 md:py-24">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CalendarHeader
          incrementMonth={incrementMonth}
          decrementMonth={decrementMonth}
          monthIndex={monthIndex}
        />
        {Object.values(calendarData ?? {}).map((months: any) => {
          return (
            <CalendarDays
              key={`calendar-${months}`}
              dataMonths={months}
              monthIndex={monthIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
