import React, { useEffect } from "react";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import { SubmitHandler, useFormContext } from "react-hook-form";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import FormInputRadio from "../../shared/FormInputRadio/FormInputRadio";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import usePatchApi from "../../../hooks/api/patch/useApiPatch";
import { useAppContext } from "../../../appContext/appContext";
import usePostApi from "../../../hooks/api/post/useApiPost";
import { buildPlankDate } from "../../../utils";
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
    setObjectData,
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

  useEffect(() => {
    if (!objectData) {
      reset({
        month: "",
        day: "",
        duration: "00:00:00",
        isDifferentExercises: false,
      });
    } else {
      reset({
        month: objectData.month,
        day: objectData.day,
        duration: objectData.duration,
        isDifferentExercises: objectData.isDifferentExercises,
      });
    }
  }, [objectData, reset]);

  const onSubmit: SubmitHandler<PlankFormInput> = async (data) => {
    const { isDifferentExercises, duration, month, day } = data;
    const bodyData = {
      isDifferentExercises,
      duration,
      date: buildPlankDate({
        month,
        day,
      }),
    };

    try {
      const isEditing = Object.keys(objectData ?? {}).length > 0;

      if (isEditing) {
        if (!objectData?.id) {
          return;
        }
        await updateMutateAsync({
          bodyData,
          customLink: `${URL}${API_ENDPOINTS.PLANK.UPDATE(objectData?.id)}`,
        });
      } else {
        await mutateAsync({
          bodyData,
        });
      }
      setToggleOpenFormPanelTraining(false);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Błąd zapisu");
      toast.error(error instanceof Error ? error.message : "Błąd zapisu");
    } finally {
      setObjectData(undefined);
    }
  };

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
            <FormInputSelect
              id="month"
              name="month"
              label="Miesiąc"
              className="mb-2 w-2/5"
              rules={{ required: "Pole jest wymagane" }}
              options={Object.entries(MONTH_NAMES_MAP).map(
                ([index, month]) => ({
                  value: index.length === 1 ? `0${index}` : index,
                  name: month,
                }),
              )}
            />
            <FormInputSelect
              id="day"
              name="day"
              label="Dzień"
              className="mb-2 w-2/5"
              rules={{ required: "Pole jest wymagane" }}
              options={getDaysByMonth()}
            />
            <FormInputDuration
              name="duration"
              label="Długość treningu"
              className="mb-2 w-2/5"
            />
            <FormInputRadio
              id="isDifferentExercises"
              name="isDifferentExercises"
              label="Czy plank był róznorodny, ze zmienionymi ćwiczeniami?"
              radioOptions={RADIO_INPUT_DIFFERENT_TYPES_PLANK_VALUES}
              className="mb-2"
              errors={errors}
              rules={{}}
              //defaultValue={objectData?.isDifferentExercises}
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
//remove
