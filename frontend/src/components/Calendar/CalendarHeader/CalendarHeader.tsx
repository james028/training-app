import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { DateTime, WeekdayNumbers } from "luxon";
import { StyledButton, StyledDayWidth } from "./style";
import { TButtons } from "../../../types";

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

  // **
  // * Generuje posortowaną tablicę skróconych nazw dni tygodnia (np. "pon", "wt", "śr").
  // * Kolejność jest zgodna ze standardem ISO (Poniedziałek = 1).
  //   * @param locale Opcjonalny język (np. 'pl-PL', 'en-US'). Jeśli nie podano, używa systemowego.
  //   * @returns Tablica nazw dni tygodnia.
  //   */
  const generateWeekdayHeaders = (locale?: string): string[] => {
    const dayNames: string[] = [];

    // Zaczynamy od pierwszego dnia tygodnia ISO (poniedziałek, indeks 1)
    const ISO_WEEKDAYS: WeekdayNumbers[] = [1, 2, 3, 4, 5, 6, 7];
    for (const i of ISO_WEEKDAYS) {
      // Tworzymy tymczasowy obiekt daty, ustawiając go na dzień tygodnia 'i'.
      // Używamy DateTime.local() i ustawiamy jego dzień tygodnia na 'i'.
      const tempDay = DateTime.local().set({ weekday: i });

      // Formatujemy dzień:
      // "EEE" -> Skrócona nazwa dnia (np. Mon, Pon)
      // "E" -> Najkrótsza nazwa (np. M, P)
      const dayName = tempDay.toFormat("EEE", { locale: locale });

      dayNames.push(dayName);
    }

    return dayNames;
  };

  //zrobic z context api //hmm
  const days1: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days: string[] = generateWeekdayHeaders();

  //potem context
  const getCurrentDate = (): Record<string, string | number> => {
    const currentDate = DateTime.now();
    const { year } = currentDate.toObject();

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
