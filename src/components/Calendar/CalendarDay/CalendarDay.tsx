import React from "react";
import { TDay } from "../../../types/app-types";

const CalendarDay = ({ data, day }: { data: TDay[]; day: any }) => {
  const renderEvents = () => {
    if (data?.length > 3) {
      return <div className="flex items-center align-items">+3</div>;
    } else {
      if (data?.length > 0) {
        return data?.map((event: TDay, index1: any) => {
          return (
            <div
              //zmienic
              key={index1}
              className="px-2 py-0.5 text-sm rounded-lg mt-1 overflow-hidden border border-blue-200 text-blue-800 bg-blue-100 cursor-pointer"
            >
              <div
                className="flex items-center justify-between"
                onClick={() => null}
              >
                <span>{event.type}</span>
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex leading-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          );
        });
      }
    }
  };

  return (
    <div
      //zmienic
      style={{ width: "14.28%", height: "140px" }}
      className="px-4 pt-2 border-r border-b relative cursor-pointer"
    >
      {day !== "00" ? (
        <div className="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100">
          {Number(day)}
        </div>
      ) : null}
      {renderEvents()}
    </div>
  );
};
export default CalendarDay;

// :class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }"
