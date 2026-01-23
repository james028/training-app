import React from "react";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
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
import {
  ConvertedMonthObjectMap,
  MonthDaysMap,
  MonthIndex,
  MonthName,
  MonthNameLower,
  MonthObjectMap,
} from "../../../types";
import {
  MONTH_NAMES_MAP,
  RADIO_INPUT_DIFFERENT_TYPES_PLANK_VALUES,
  URL,
} from "../../../constants";
import toast from "react-hot-toast";

const AddEditPlankTraining = () => {
  const {
    toggleOpenFormPanelTraining,
    setToggleOpenFormPanelTraining,
    objectData,
  } = usePlankSectionContext();

  const { link, auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useFormContext();

  const { mutateAsync } = usePostApi({
    link: `${URL}api/plank/create`,
    queryKey: ["createPlank"],
    headers: { Authorization: `Bearer ${token}` },
  });
  const { mutateAsync: updateMutateAsync } = usePatchApi({
    link: `${URL}${link}/update`,
    //queryKey: ["updatePlank"],
  });
  const { refetch: refetchList } = useGetApi({
    link: `${URL}api/plank/list`,
    queryKey: ["plankList"],
    headers: { Authorization: `Bearer ${token}` },
  });

  //otypować any
  const onSubmit = handleSubmit(async (data: any) => {
    let convertedBodyData = {
      ...data,
      duration: convertObjectWithNumbersToString(data.duration),
    };

    try {
      const isEditing = Object.keys(objectData ?? {}).length > 0;
      if (isEditing) {
        const editedData = {
          ...convertedBodyData,
          day: Number(convertedBodyData.day),
          id: objectData?._id,
        };
        await updateMutateAsync({
          bodyData: editedData,
        });
      } else {
        await mutateAsync({
          bodyData: convertedBodyData,
        });
      }
      setToggleOpenFormPanelTraining(false);
      reset();
      await refetchList?.();
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Błąd zapisu");
      toast.error(error instanceof Error ? error.message : "Błąd zapisu");
      //console.log((error && error?.message) || "");
    }
  });

  const getDays = (year: number, month: number): number => {
    return DateTime.local(year, month).daysInMonth ?? 0;
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
    const convertedObjectToLowerCase =
      convertObjectToLowerCase(MONTH_NAMES_MAP);

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

  const isEditing = Object.keys(objectData ?? {}).length > 0;
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
              options={Object.entries(MONTH_NAMES_MAP).map(
                ([index, month]) => ({
                  value: index.length === 1 ? `0${index}` : index,
                  name: month,
                }),
              )}
              // @ts-ignore
              defaultValue={
                MONTH_NAMES_MAP[
                  objectData?.month as unknown as keyof typeof MONTH_NAMES_MAP
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
                  // @ts-ignore
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
              radioOptions={RADIO_INPUT_DIFFERENT_TYPES_PLANK_VALUES}
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
              {isEditing ? "Zaaktualizuj" : "Zapisz"}
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default AddEditPlankTraining;

//templatka radio do zrobienia, przemysleć
