import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import { calendarDataForCurrentMonth } from "../../mock/mock";
import { useAppContext } from "../../appContext/appContext";
import { calendarData } from "../../mock/mock2";

const daysArray = [
  "2025-11-01",
  "2025-11-02",
  "2025-11-03",
  "2025-11-04",
  "2025-11-05",
  "2025-11-06",
  "2025-11-07",
  "2025-11-08",
  "2025-11-09",
  "2025-11-10",
  "2025-11-11",
  "2025-11-12",
  "2025-11-13",
  "2025-11-14",
  "2025-11-15",
  "2025-11-16",
  "2025-11-17",
  "2025-11-18",
  "2025-11-19",
  "2025-11-20",
  "2025-11-21",
  "2025-11-22",
  "2025-11-23",
  "2025-11-24",
  "2025-11-25",
  "2025-11-26",
  "2025-11-27",
  "2025-11-28", // Dziś (przykład)
  "2025-11-29",
  "2025-11-30",
];

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();

  const incrementMonth = () => {
    setMonthIndex((prev: number) => prev + 1);
  };

  const decrementMonth = () => {
    setMonthIndex((prev: number) => prev - 1);
  };

  //console.log(Object.values(calendarData ?? {}));

  return (
    <div className="container mx-auto px-4 py-2 md:py-24">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CalendarHeader
          incrementMonth={incrementMonth}
          decrementMonth={decrementMonth}
          monthIndex={monthIndex}
        />
        {/*{Array.from({ length: 12 }, (_, a) => {*/}
        {/*  return { number: a };*/}
        {/*}).map((months: any) => {*/}
        {/*  console.log(months, "monthIndex");*/}
        {/*  return (*/}
        <CalendarDays
          key={`calendar-${1}`}
          dataMonths={Object.values(calendarData)}
          monthIndex={11}
          year={2025}
          month={12}
        />
        {/*  );*/}
        {/*})}*/}
      </div>
    </div>
  );
};

export default Calendar;
