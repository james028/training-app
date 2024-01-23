import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./style.css";
import { TButtons } from "../../../types/app-types";
import { DateTime } from "luxon";

import styled from "styled-components";

const StyledButton = styled.button<{ disabledClass?: boolean }>`
  background-color: ${(props) => (props.disabledClass ? "#b7bcca" : null)};
`;

const CalendarHeader = ({
  incrementMonth,
  decrementMonth,
  monthIndex,
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
      disabled: monthIndex === 1,
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
      disabled: monthIndex > 11,
      border: null,
    },
  ];

  //zrobic z context api
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //potem context
  const getCurrentDate = (): Record<string, string | number> => {
    const currentDate = DateTime.now();
    const { year, month, day } = currentDate.toObject();

    //obecny miesiąc tu musy vtc
    const date = DateTime.fromObject({
      year,
      month: monthIndex,
      day: 1,
    })
      .toFormat("MMMM/yyyy")
      .split("/");

    return { month: date[0], year: date[1] };
  };

  useEffect(() => {
    getCurrentDate();
  }, [monthIndex]);

  const { year, month } = getCurrentDate();

  return (
    <>
      <div className="flex items-center justify-between py-2 px-6">
        <div>
          <span className="text-lg font-bold text-gray-800">
            {t(month as string)}
          </span>
          <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
        </div>
        <div className="border rounded-lg px-1" style={{ paddingTop: "2px" }}>
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
            <div key={day} className="px-2 py-2 dayWidth">
              <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                {t(day)}
              </div>
            </div>
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
