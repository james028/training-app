import React from "react";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import { SubmitHandler, useFormContext } from "react-hook-form";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import { DateTime } from "luxon";
import FormInputRadio from "../../shared/FormInputRadio/FormInputRadio";
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
  API_ENDPOINTS,
  MONTH_NAMES_MAP,
  RADIO_INPUT_DIFFERENT_TYPES_PLANK_VALUES,
  URL,
} from "../../../constants";
import toast from "react-hot-toast";
import { PLANK_KEYS } from "../../../constants/query-keys";
import { PlankFormInput } from "../PlankSectionWrapper/PlankSectionWrapper";
import { useDisplayDaysByMonth } from "../utils/useDisplayDaysByMonth";

const AddEditPlankTraining = () => {
  const {
    toggleOpenFormPanelTraining,
    setToggleOpenFormPanelTraining,
    objectData,
  } = usePlankSectionContext();

  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useFormContext<PlankFormInput>();

  const { mutateAsync } = usePostApi({
    link: `${URL}${API_ENDPOINTS.PLANK.CREATE}`,
    invalidateKeys: [PLANK_KEYS.plankList()],
    headers: { Authorization: `Bearer ${token}` },
  });
  const { mutateAsync: updateMutateAsync } = usePatchApi({
    invalidateKeys: [PLANK_KEYS.plankList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const onSubmit: SubmitHandler<PlankFormInput> = async (data) => {
    const convertedBodyData = {
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

        if (!objectData?._id) {
          //inaczej?
          return;
        }
        await updateMutateAsync({
          bodyData: editedData,
          customLink: `${URL}${API_ENDPOINTS.PLANK.UPDATE(objectData?._id)}`,
        });
      } else {
        await mutateAsync({
          bodyData: convertedBodyData,
        });
      }

      setToggleOpenFormPanelTraining(false);
      reset();
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Błąd zapisu");
      toast.error(error instanceof Error ? error.message : "Błąd zapisu");
    }
  };

  console.log(errors, "errors");

  //ta cała logika do odzielnego kopmponentu
  const { month: monthValue } = watch();
  const { getDaysByMonth } = useDisplayDaysByMonth(monthValue);

  const isEditing = Object.keys(objectData ?? {}).length > 0;
  return (
    <>
      <button
        className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        type="submit"
        onClick={() => setToggleOpenFormPanelTraining((prev) => !prev)}
      >
        {!toggleOpenFormPanelTraining ? "Dodaj trening" : "Zamknij panel"}
      </button>
      {toggleOpenFormPanelTraining ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
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
