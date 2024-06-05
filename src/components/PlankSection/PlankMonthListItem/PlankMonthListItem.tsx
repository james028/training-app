import React from "react";
import styled from "styled-components";

import { monthObject } from "../../../utils/utils";
import { DateTime } from "luxon";

const PlankSectionListItemContainer = styled.div`
  flex: 0 0 33%;
`;

const PlankSectionListItem = styled.div`
  display: flex;
`;

type PlankMonthListItem = {
  itemData: Record<string, any[]>;
  item: string;
};

const PlankMonthListItem = ({ itemData, item }: PlankMonthListItem) => {
  function foo(values: string[], index: number): number {
    const x = values
      .map((e: string) =>
        e.split(":").reverse()[index]
          ? Number(e.split(":").reverse()[index])
          : 0,
      )
      .reduce((a: any, b: any) => a + b);

    console.log(x, "x");
    return x;
  }

  const validate = (time: number) => {
    if (time > 59 || time < 0) {
      throw new Error(
        "Hours, minutes and seconds values have to be between 0 and 59.",
      );
    }
    return time;
  };

  function sumMinutes(values: string[]) {
    const seconds = foo(values, 0);
    let minutes = foo(values, 1);
    let hours = foo(values, 2);

    minutes *= 60;
    hours *= 3600;

    //tu ogarnąć
    // console.log(new Date((hours + minutes + seconds) * 1000), "1");
    // console.log(
    //   new Date((hours + minutes + seconds) * 1000).toISOString(),
    //   "2",
    // );
    // console.log(
    //   DateTime.fromISO(String(new Date((hours + minutes + seconds) * 1000))),
    //   "3",
    // );
    //console.log(String(new Date((hours + minutes + seconds) * 1000)), "4");
    return new Date((hours + minutes + seconds) * 1000)
      .toISOString()
      .substr(11, 8);
    //return result.split(":").reverse()[2] === "00" ? result.slice(3) : result;
  }

  const displayMonthNames = (monthIndex: string): string => {
    return (
      monthObject[monthIndex as unknown as keyof typeof monthObject] ?? "-"
    );
  };
  const displaySumMinutes = (data: any, itemIndex: any): string => {
    const durations = data[itemIndex].map(
      (item: Record<string, string>) => item.duration,
    );

    return durations.length ? sumMinutes(durations) : "-";
  };

  const checkIfMonthIsExist = (monthIndex: string): boolean => {
    const currentDate = DateTime.now();
    const { year, month } = currentDate.toObject();

    const dateToCheck = DateTime.local(year, month);
    const referenceDate = DateTime.local(year, Number(monthIndex));

    const { month: checkMonth } = dateToCheck;
    const { month: referenceMonth } = referenceDate;

    return referenceMonth <= checkMonth;
  };

  return (
    <PlankSectionListItemContainer>
      <div className="mb-2 mt-3 text-2xl font-semibold text-gray-900 dark:text-white">
        {displayMonthNames(item)}
      </div>
      {checkIfMonthIsExist(item) ? (
        <>
          <PlankSectionListItem>
            <div
              className="max-w-md mr-5 space-y-1 text-gray-500 list-inside dark:text-gray-400"
              style={{ flex: "0 0 20%" }}
            >
              Dzień
            </div>
            <div
              className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400"
              style={{ flex: "0 0 40%" }}
            >
              Długość treningu
            </div>
          </PlankSectionListItem>
          {itemData[item].length === 0 ? <div>-</div> : null}
          {itemData[item].map((t, index) => {
            return (
              //zmienić
              <PlankSectionListItem key={index}>
                <div
                  className="max-w-md mr-5 space-y-1 text-gray-500 list-inside dark:text-gray-400"
                  style={{ flex: "0 0 20%" }}
                >
                  {String(t.day).length === 1 ? `0${t.day}` : t.day}
                </div>
                <div
                  className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400"
                  style={{ flex: "0 0 40%" }}
                >
                  {t.duration}
                </div>
                <div className="c" onClick={() => null}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 -2 22 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </div>
                <div className="c" onClick={() => null}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </div>
              </PlankSectionListItem>
            );
          })}
          <div>
            <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              Liczba treningów:{" "}
              <span className="font-bold">{itemData[item]?.length}</span>
            </div>
            <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              Suma czasu:{" "}
              <span className="font-bold">
                {displaySumMinutes(itemData, item)}
              </span>
              {itemData[item]?.length ? (
                <span className="ml-1">h:min:s</span>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          Ten miesiąc jeszcze nie istnieje
        </div>
      )}
    </PlankSectionListItemContainer>
  );
};

export default PlankMonthListItem;
