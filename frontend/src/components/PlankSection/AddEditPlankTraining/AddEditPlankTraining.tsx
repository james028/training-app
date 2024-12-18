import React from "react";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import { monthObject, months } from "../../../utils/utils";
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

const URL = "http://localhost:5001/";
//const CREATE_URL = "http://localhost:5001/api/plank/create";
//const UPDATE_URL = "http://localhost:5001/api/plank/update";

const AddEditPlankTraining = () => {
  const {
    toggleOpenFormPanelTraining,
    setToggleOpenFormPanelTraining,
    objectData,
  } = usePlankSectionContext();
  const { link } = useAppContext();

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
    console.log("submitting... edit plak", data);

    //tutaj funkcja na be na async/await
    let newData: any = { ...data };

    //wspoldzielona
    newData = {
      ...data,
      duration: Object.values(data.duration)
        .map((duration) => duration.toString().padStart(2, "0"))
        .join(":"),
    };

    const monthIndex = Object.keys(monthObject)
      .map((month) => {
        if (
          monthObject[month as unknown as keyof typeof monthObject] ===
          newData?.month
        ) {
          return month;
        }
      })
      .find((a) => a !== undefined);

    console.log(monthIndex, "month index", data, "data");

    newData = {
      ...newData,
      month: 3,
      day: Number(newData.day),
      id: objectData?._id,
    };

    const handleActionFetch = () => {
      setTimeout(async () => {
        setToggleOpenFormPanelTraining(false);
        reset();
        await refetchList?.();
      }, 500);
    };

    if (Object.keys(objectData ?? {}).length > 0) {
      //to zmienic na async await

      //await updateMutate({ paramsObj: null, bodyData: newData });
      handleActionFetch();
    } else {
      await mutation.mutate({ paramsObj: null, bodyData: newData });
      handleActionFetch();
    }
  });

  const getDays = (year: any, month: any) => {
    return DateTime.local(year, month).daysInMonth;
  };

  const getDaysByMonth = (): any => {
    const currentDate = DateTime.now();
    const { year } = currentDate.toObject();

    const monthDays: Record<string, number> = {};

    for (let i = 1; i <= 12; i++) {
      const index = DateTime.local(year, i).monthLong;
      // @ts-ignore
      monthDays[index] = getDays(year, i);
    }

    const { month: monthValue } = watch();
    //console.log(monthValue, "vv");
    // const days =
    //   monthDays[
    //     monthValue.length > 0 &&
    //       monthValue?.map((month: any) => month.name.toLowerCase())
    //   ];
    // const days2 = "";

    console.log(monthValue);
    // @ts-ignore
    const days =
      monthDays[
        // @ts-ignore
        monthObject[monthValue.slice(0, 1) === "01" ? 1 : 2].toLowerCase()
      ];

    console.log(monthDays, "days", days, monthObject[1]);
    const x = monthValue
      ? Array(days)
          .fill(0)
          .map((_, number) => {
            return {
              value: number + 1,
              name: String(number + 1),
            };
          })
      : null;

    console.log(x, "x");
    return x;
  };

  const { month: monthValue } = watch();
  console.log(monthValue);

  console.log(
    Object.entries(monthObject).map(([index, month]) => {
      return {
        value: index.length === 1 ? `0${index}` : index,
        name: month,
      };
    }),
    monthObject[objectData?.month as unknown as keyof typeof monthObject],
  );

  //tu dokonczyc

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
                (day: number) => day === objectData?.day,
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
