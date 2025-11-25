import React from "react";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import { RegistrationFormFields } from "../../Forms/EditTrainingForm/EditTrainingForm";
import { useFormContext } from "react-hook-form";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import { DateTime } from "luxon";
import FormInputRadio from "../../shared/FormInputRadio/FormInputRadio";
import useGetApi from "../../../hooks/api/get/useApiGet";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import usePatchApi from "../../../hooks/api/patch/useApiPatch";
import { useAppContext } from "../../../appContext/appContext";
import usePostApi from "../../../hooks/api/post/useApiPost";
import { convertObjectWithNumbersToString } from "../../../utils";
import { monthObject } from "../../../constants";
import {
  ConvertedMonthObjectMap,
  MonthDaysMap,
  MonthIndex,
  MonthName,
  MonthNameLower,
  MonthObjectMap,
} from "../../../types";

const URL = "http://localhost:5001/";

const AddEditPlankTraining = () => {
  const {
    toggleOpenFormPanelTraining,
    setToggleOpenFormPanelTraining,
    objectData,
  } = usePlankSectionContext();

  const { link, user } = useAppContext();
  const token = user?.accessToken ?? "";

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useFormContext();

  const { mutation } = usePostApi(
    //`${URL}${link}/create`,
    `${URL}api/plank/create`,
    ["createPlank"],
    null,
    { Authorization: `Bearer ${token}` },
  );
  const { mutate: updateMutate } = usePatchApi(
    `${URL}${link}/update`,
    ["updatePlank"],
    null,
  );
  const { refetch: refetchList } = useGetApi(
    //`${URL}${link}/list`,
    `${URL}api/plank/list`,
    ["plankList"],
    undefined,
  );

  // poprawic to
  // @ts-ignore
  const onSubmit = handleSubmit(async (data: RegistrationFormFields) => {
    //zmienic zeby nie wysylalo czerwiec tylko index, czyli no fubkcja na stowrzenie z tab z ob z month

    //tutaj funkcja na be na async/await
    let convertedBodyData: any = { ...data };

    convertedBodyData = {
      ...convertedBodyData,
      duration: convertObjectWithNumbersToString(data.duration),
    };

    //console.log(convertObjectWithNumbersToString(data.duration));

    const monthIndex = Object.keys(monthObject)
      .map((month) => {
        if (
          monthObject[month as unknown as keyof typeof monthObject] ===
          convertedBodyData?.month
        ) {
          return month;
        }
      })
      .find((a) => a !== undefined);

    console.log(
      monthIndex,
      "month index",
      data,
      "data",
      convertedBodyData,
      "newData",
    );

    convertedBodyData = {
      ...convertedBodyData,
      month: 3,
      day: Number(convertedBodyData.day),
      id: objectData?._id,
    };

    const handleActionFetch = () => {
      setTimeout(async () => {
        setToggleOpenFormPanelTraining(false);
        reset();
        await refetchList?.();
      }, 500);
    };

    // if (Object.keys(objectData ?? {}).length > 0) {
    //   //to zmienic na async await
    //   console.log("222");
    //   await updateMutate({ paramsObj: null, bodyData: newData });
    //   //handleActionFetch();
    // } else {
    //   console.log("333");
    //   await mutation.mutate({ paramsObj: null, bodyData: newData });
    //   //handleActionFetch();
    // }
  });

  const getDays = (year: number, month: number): number | undefined => {
    return DateTime.local(year, month).daysInMonth;
  };

  const convertObjectToLowerCase = (
    months: MonthObjectMap,
  ): ConvertedMonthObjectMap => {
    const convertedMonthObject = {} as ConvertedMonthObjectMap;
    for (const keyString in months) {
      const key = parseInt(keyString, 10) as MonthIndex;
      const value = months[key];

      convertedMonthObject[key] = value.toLowerCase() as MonthNameLower;
    }
    return convertedMonthObject;
  };

  const createObjectMonthDays = (): Partial<MonthDaysMap> => {
    const currentDate = DateTime.now();
    const { year } = currentDate.toObject();
    const monthDays: Partial<MonthDaysMap> = {};

    for (let i = 1; i <= 12; i++) {
      const monthName = DateTime.local(year, i).monthLong as MonthName;
      const keyLower = monthName.toLowerCase() as MonthNameLower;
      monthDays[keyLower] = getDays(year, i);
    }

    return monthDays;
  };

  const getDaysByMonth = (): { value: number; name: string }[] => {
    const { month: monthValue } = watch();
    const monthKey = parseInt(monthValue, 10);

    const convertedObjectMonthDays = createObjectMonthDays();
    const convertedObjectToLowerCase = convertObjectToLowerCase(monthObject);

    const monthName =
      convertedObjectToLowerCase[
        monthKey as keyof typeof convertedObjectToLowerCase
      ];

    const days = monthValue ? convertedObjectMonthDays[monthName] : [];

    return days
      ? Array(days)
          .fill(0)
          .map((_: any, number: number) => {
            const value = number + 1;
            return {
              value,
              name: String(value),
            };
          })
      : [];
  };

  return (
    <>
      <button
        className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        type="submit"
        onClick={() => setToggleOpenFormPanelTraining((prev: any) => !prev)}
      >
        {!toggleOpenFormPanelTraining ? "Dodaj trening" : "Zamknij panel"}
      </button>
      {toggleOpenFormPanelTraining ? (
        <>
          <form onSubmit={onSubmit}>
            <FormInputSelect<any>
              id="month"
              name="month"
              label="Miesiąc"
              className="mb-2 w-2/5"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
              options={Object.entries(monthObject).map(([index, month]) => {
                return {
                  value: index.length === 1 ? `0${index}` : index,
                  name: month,
                };
              })}
              // @ts-ignore
              defaultValue={
                monthObject[
                  objectData?.month as unknown as keyof typeof monthObject
                ]
              }
            />
            <FormInputSelect<any>
              id="day"
              name="day"
              label="Dzień"
              className="mb-2 w-2/5"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
              options={getDaysByMonth()}
              // @ts-ignore
              defaultValue={getDaysByMonth()?.find(
                (day: { value: number; name: string }) =>
                  day === objectData?.day,
              )}
            />
            <FormInputDuration<any>
              id="duration"
              // @ts-ignore
              type="number"
              name="duration"
              label="Długość treningu"
              className="mb-2 w-2/5"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
              // @ts-ignore
              defaultValue={objectData?.duration}
            />
            <FormInputRadio
              id="isDifferentExercises"
              // @ts-ignore
              type="radio"
              name="isDifferentExercises"
              label="Czy plank był róznorodny, ze zmienionymi ćwiczeniami?"
              className="mb-2"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
              defaultValue={objectData?.isDifferentExercises}
              leftSideLabel={true}
            />
            <button
              className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              type="submit"
            >
              {Object.keys(objectData ?? {}).length > 0
                ? "Zaaktualizuj"
                : "Zapisz"}
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default AddEditPlankTraining;

//templatka radio do zrobienia, przemysleć
