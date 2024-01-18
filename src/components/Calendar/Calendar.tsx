import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import { calendarData } from "../../mock/mock";
import { TYear } from "../../types/app-types";
import { DateTime } from "luxon";

const Calendar = () => {
  const [monthIndex, setMonthIndex] = useState(0);

  const incrementMonth = () => {
    setMonthIndex((prev) => prev + 1);
  };

  const decrementMonth = () => {
    setMonthIndex((prev) => prev - 1);
  };

  //monthIndex, setMonthIndex jako context api

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
