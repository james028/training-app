import React, { useState } from "react";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import { months } from "../../../utils/utils";
import { RegistrationFormFields } from "../../Forms/EditTrainingForm/EditTrainingForm";
import { FormProvider, useForm } from "react-hook-form";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import { DateTime } from "luxon";
import FormInputRadio from "../../shared/FormInputRadio/FormInputRadio";

const AddEditPlankTraining = () => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(false);
  const [monthName, setMonthName] = useState<string>("");

  //to any
  const form = useForm<any>({
    defaultValues: {
      month: "",
      day: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      isDifferentExercises: "",
    },
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit((data: RegistrationFormFields) => {
    //zmienic zeby nie wysylalo czerwiec tylko index, czyli no fubkcja na stowrzenie z tab z ob z month
    console.log("submitting... edit plak", data);
  });

  const getDays = (year: any, month: any) => {
    return DateTime.local(year, month).daysInMonth;
  };

  const getDaysByMonth = () => {
    const currentDate = DateTime.now();
    const { year, month } = currentDate.toObject();

    const monthDays: Record<string, number> = {};

    for (let i = 1; i <= 12; i++) {
      const index = DateTime.local(year, i).monthLong;
      // @ts-ignore
      monthDays[index] = getDays(year, i);
    }

    const { month: monthValue } = watch();
    const days = monthDays[monthValue.toLowerCase()];

    return monthValue
      ? Array(days)
          .fill(0)
          .map((_, number) => number + 1)
      : null;
  };

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
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <FormInputSelect<any>
                id="month"
                name="month"
                label="Miesiąc"
                className="mb-2"
                errors={errors}
                rules={{ required: "Pole jest wymagane" }}
                options={months}
              />
              <FormInputSelect<any>
                id="day"
                name="day"
                label="Dzień"
                className="mb-2"
                errors={errors}
                rules={{ required: "Pole jest wymagane" }}
                options={getDaysByMonth()}
              />
              <FormInputDuration<any>
                id="duration"
                // @ts-ignore
                type="number"
                name="duration"
                label="Długość treningu"
                className="mb-2"
                errors={errors}
                rules={{ required: "Pole jest wymagane" }}
                // @ts-ignore
                defaultValue={""}
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
                // @ts-ignore
                //defaultValue={""}
                leftSideLabel={true}
              />
              <button
                className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                type="submit"
              >
                Zapisz
              </button>
            </form>
          </FormProvider>
        </>
      ) : null}
    </>
  );
};

export default AddEditPlankTraining;

//templatka radio do zrobienia, przemysleć
