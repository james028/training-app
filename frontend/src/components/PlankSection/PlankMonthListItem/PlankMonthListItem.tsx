import React, { useState } from "react";

import { monthObject } from "../../../utils/utils";
import { DateTime } from "luxon";
import {
  StyledPlankSectionListItem,
  StyledPlankSectionListItemContainer,
  StyledColumnWidth20,
  StyledColumnWidth32,
  StyledColumnWidth10,
} from "./style";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import Modal from "../../shared/Modal/Modal";
import RemovePlankTraining from "../RemovePlankTraining/RemovePlankTraining";

type PlankMonthListItem = {
  itemData: Record<string, any[]>;
  item: string;
};

const PlankMonthListItem = ({ itemData, item }: PlankMonthListItem) => {
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);

  const {
    toggleOpenFormPanelTraining,
    setToggleOpenFormPanelTraining,
    setObjectData,
  } = usePlankSectionContext();

  function foo(values: string[], index: number): number {
    return values
      ?.map((e: string) =>
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
    <StyledPlankSectionListItemContainer>
      <div className="mb-2 mt-3 text-2xl font-semibold text-gray-900 dark:text-white">
        {displayMonthNames(item)}
      </div>
      {checkIfMonthIsExist(item) ? (
        <>
          <StyledPlankSectionListItem>
            <StyledColumnWidth20 className="max-w-md mr-5 space-y-1 text-gray-500 list-inside dark:text-gray-400">
              Dzień
            </StyledColumnWidth20>
            <StyledColumnWidth32 className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              Długość treningu
            </StyledColumnWidth32>
            <StyledColumnWidth10 className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              Rózne
            </StyledColumnWidth10>
          </StyledPlankSectionListItem>
          {itemData[item].length === 0 ? <div>-</div> : null}
          {itemData[item].map((t, index) => {
            return (
              //zmienić
              <StyledPlankSectionListItem key={index}>
                <StyledColumnWidth20 className="max-w-md mr-5 space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  {String(t.day).length === 1 ? `0${t.day}` : t.day}
                </StyledColumnWidth20>
                <StyledColumnWidth32 className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  {t.duration}
                </StyledColumnWidth32>
                <StyledColumnWidth10 className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  {t.isDifferentExercises === "differentYes" ? (
                    <svg
                      className="w-6 h-6 text-emerald-600 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    "-"
                  )}
                </StyledColumnWidth10>
                <div
                  onClick={() => {
                    if (!toggleOpenFormPanelTraining) {
                      setToggleOpenFormPanelTraining(true);
                    }
                    setObjectData(t);
                  }}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                <div
                  onClick={() => {
                    setIsOpenRemoveModal((prev) => !prev);
                    setObjectData(t);
                  }}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
              </StyledPlankSectionListItem>
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
      {isOpenRemoveModal ? (
        <Modal
          openModal={() => setIsOpenRemoveModal(true)}
          closeModal={() => setIsOpenRemoveModal(false)}
          modalTitle={"Usuwanie treningu"}
        >
          <RemovePlankTraining closeModal={() => setIsOpenRemoveModal(false)} />
        </Modal>
      ) : null}
    </StyledPlankSectionListItemContainer>
  );
};

export default PlankMonthListItem;
