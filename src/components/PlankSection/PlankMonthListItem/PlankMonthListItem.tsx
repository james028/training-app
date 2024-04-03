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
  function foo(values: string[], index: number) {
    return values
      .map((e: string) =>
        e.split(":").reverse()[index]
          ? Number(e.split(":").reverse()[index])
          : 0,
      )
      .reduce((a: any, b: any) => a + b);
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
              Ed
            </div>
            <div className="c" onClick={() => null}>
              Us
            </div>
          </PlankSectionListItem>
        );
      })}
      <div>
        <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          Liczba treningów:{" "}
          <span className="font-bold">
            {checkIfMonthIsExist(item)
              ? itemData[item]?.length
              : "Ten miesiąc jeszcze nie istnieje"}
          </span>
        </div>
        <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          Suma czasu:{" "}
          <span className="font-bold">
            {checkIfMonthIsExist(item)
              ? displaySumMinutes(itemData, item)
              : "Ten miesiąc jeszcze nie istnieje"}
          </span>
        </div>
      </div>
    </PlankSectionListItemContainer>
  );
};

export default PlankMonthListItem;
