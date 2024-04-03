import React from "react";
import styled from "styled-components";

import { monthObject } from "../../../utils/utils";

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
  const displayMonthNames = (monthIndex: string): string => {
    return (
      monthObject[monthIndex as unknown as keyof typeof monthObject] ?? "-"
    );
  };

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

  /* examples */
  const seconds = ["00:03", "00:9"];
  const mins = ["01:20", "1:23"];
  const hours = ["00:03:59", "02:05:02"];
  const mix = ["00:04:58", "10:00"];

  return (
    <PlankSectionListItemContainer>
      <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {displayMonthNames(item)}
      </div>
      <PlankSectionListItem>
        <div className="max-w-md mr-5 space-y-1 text-gray-500 list-inside dark:text-gray-400">
          Dzień
        </div>
        <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          Długość treningu
        </div>
      </PlankSectionListItem>
      {itemData[item].length === 0 ? <div>-</div> : null}
      {itemData[item].map((t, index) => {
        return (
          //zmienić
          <PlankSectionListItem key={index}>
            <div className="max-w-md mr-5 space-y-1 text-gray-500 list-inside dark:text-gray-400">
              {String(t.day).length === 1 ? `0${t.day}` : t.day}
            </div>
            <div className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              {t.duration}
            </div>
            <div className="c" onClick={() => null}>
              Edytuj
            </div>
          </PlankSectionListItem>
        );
      })}
      <div className="r">
        <div>Liczba treningów: {itemData[item].length}</div>
        <div>
          Suma czasu :{" "}
          {itemData[item].map((it) => it.duration).length
            ? sumMinutes(itemData[item].map((e) => e.duration))
            : "-"}
        </div>
      </div>
    </PlankSectionListItemContainer>
  );
};

export default PlankMonthListItem;
