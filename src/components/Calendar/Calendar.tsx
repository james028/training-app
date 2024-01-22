import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDays from "./CalendarDays/CalendarDays";
import { calendarData } from "../../mock/mock";
import { TYear } from "../../types/app-types";
import { DateTime } from "luxon";

const Calendar = () => {
  const [monthIndex, setMonthIndex] = useState(() => {
    const currentDate = DateTime.now();
    const { month } = currentDate.toObject();

    return month;
  });

  const incrementMonth = () => {
    setMonthIndex((prev) => prev + 1);
  };

  const decrementMonth = () => {
    setMonthIndex((prev) => prev - 1);
  };

  //monthIndex, setMonthIndex jako context api

  console.log(monthIndex, "index");

  const foo = () => {
    const v = Object.values(calendarData);
    const k = Object.values(v);

    console.log(Object.values(k), "r");
    const xx = [];

    // k.forEach((x: any) => {
    //   console.log(x, "x");
    //   x.forEach((a) => {
    //     console.log(a, "a");
    //   });
    // });
  };

  foo();

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
