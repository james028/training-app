import React from "react";
import { useTranslation } from "react-i18next";

import { DateTime, WeekdayNumbers } from "luxon";
import { StyledButton, StyledDayWidth } from "./style";
import { TButtons } from "../../../types";

const CalendarHeader = ({
  incrementMonth,
  decrementMonth,
  year,
  month,
}: any) => {
  const { t } = useTranslation();

  const buttons: TButtons[] = [
    {
      key: 1,
      handleChangeMonth: decrementMonth,
      svg: (
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ),
      disabled: null,
      border: <div className="border-r inline-flex h-6"></div>,
    },
    {
      key: 2,
      handleChangeMonth: incrementMonth,
      svg: (
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
      ),
      disabled: null,
      border: null,
    },
  ];

  const generateWeekdayHeaders = (locale?: string): string[] => {
    const dayNames: string[] = [];

    // Zaczynamy od pierwszego dnia tygodnia ISO (poniedziałek, indeks 1)
    const ISO_WEEKDAYS: WeekdayNumbers[] = [1, 2, 3, 4, 5, 6, 7];
    for (const i of ISO_WEEKDAYS) {
      const tempDay = DateTime.local().set({ weekday: i });
      const dayName = tempDay.toFormat("EEE", { locale: locale });

      dayNames.push(dayName);
    }

    return dayNames;
  };

  const days: string[] = generateWeekdayHeaders();

  return (
    <>
      <div className="flex items-center justify-between py-2 px-6">
        <div>
          <span className="text-lg font-bold text-gray-800">
            {t(month as string)}
          </span>
          <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
        </div>
        <div className="border rounded-lg px-1">
          {buttons.map(
            ({ key, svg, handleChangeMonth, border, disabled }: TButtons) => {
              return (
                <React.Fragment key={`buttons-${key}`}>
                  <StyledButton
                    disabledClass={disabled}
                    type="button"
                    className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex
                     cursor-pointer hover:bg-gray-200 p-1 items-center"
                    onClick={handleChangeMonth}
                    disabled={disabled}
                  >
                    {svg}
                  </StyledButton>
                  {border}
                </React.Fragment>
              );
            },
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        {days.map((day: string) => {
          return (
            <StyledDayWidth key={day} className="px-2 py-2">
              <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                {t(day)}
              </div>
            </StyledDayWidth>
          );
        })}
      </div>
    </>
  );
};

export default CalendarHeader;

{
  /*:class="{'cursor-not-allowed opacity-25': month == 0}"*/
}
{
  /*:disabled="month == 0 ? true : false"*/
}
{
  /*@click="month--; getNoOfDays()"*/
}

{
  /*:class="{'cursor-not-allowed opacity-25': month == 11}"*/
}
{
  /*:disabled="month == 11 ? true : false"*/
}
{
  /*@click="month++; getNoOfDays()"*/
}
