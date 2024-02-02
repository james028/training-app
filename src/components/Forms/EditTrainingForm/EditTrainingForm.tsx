import React, { useState } from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import EditLabelInput from "../../shared/EditLabelInput/EditLabelInput";
import FormInput from "../../shared/FormInput/FormInput";
import { useForm } from "react-hook-form";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";

export type RegistrationFormFields = {
  trainingType: string;
  duration: {
    hour: string;
    minutes: string;
    seconds: string;
  };
  bikeType?: string;
  bikeKilometers?: number;
};

const EditTrainingForm = ({ eventData, closeModal }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormFields>({
    defaultValues: {
      trainingType: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      bikeKilometers: 0,
      bikeType: "",
    },
  });

  const onSubmit = handleSubmit((data: RegistrationFormFields) => {
    console.log("submitting... edit", data);

    //tutaj funkcja na be na async/await
    let newData: any = { ...data };

    //wspoldzielona
    newData = {
      ...data,
      duration: Object.values(data.duration)
        .map((duration) => duration.toString().padStart(2, "0"))
        .join(":"),
    };

    console.log(newData);
    closeModal();
  });

  return (
    <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <EditLabelInput
            label={"Typ treningu"}
            isEdit={isEdit}
            childrenInput={
              <FormInput<any>
                id="trainingType"
                // @ts-ignore
                type="text"
                name="trainingType"
                label="Typ treningu"
                placeholder="Typ treningu"
                className="mb-2"
                register={register}
                errors={errors}
                rules={{ required: "You must enter your first name." }}
              />
            }
            eventDataField={eventData?.type}
          />
          <EditLabelInput
            label={"Długość treningu"}
            isEdit={isEdit}
            childrenInput={
              <FormInputDuration<any>
                id="duration"
                // @ts-ignore
                type="number"
                name="duration"
                label="Długość treningu"
                className="mb-2"
                register={register}
                errors={errors}
                rules={{ required: "You must enter your Długość treningu." }}
              />
            }
            eventDataField={eventData?.duration}
          />
          <EditLabelInput
            label={"Rodzaj roweru"}
            isEdit={isEdit}
            childrenInput={
              <FormInputSelect<any>
                id="bikeType"
                // @ts-ignore
                type="select"
                name="bikeType"
                label="Rodzaj roweru"
                placeholder="Rodzaj roweru"
                className="mb-2"
                register={register}
                errors={errors}
                rules={{ required: "You must enter your first name." }}
                options={["one", "two"]}
              />
            }
            eventDataField={eventData?.bikeType}
          />
          <EditLabelInput
            label={"Liczba kilometrów"}
            isEdit={isEdit}
            childrenInput={
              <FormInput<any>
                id="bikeKilometers"
                // @ts-ignore
                type="text"
                name="bikeKilometers"
                label="Liczba kilometrów"
                placeholder="Liczba kilometrów"
                className="mb-2"
                register={register}
                errors={errors}
                rules={{
                  valueAsNumber: true,
                  required: "You must enter your first name.",
                }}
              />
            }
            eventDataField={eventData?.bikeKilometers}
          />
        </div>
        <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b p-2">
          {isEdit ? (
            <button
              type="button"
              className="inline-block rounded border-2 border-primary mr-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              onClick={() => setIsEdit(false)}
            >
              Zakończ edytowanie
            </button>
          ) : null}
          <button
            type="button"
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
            onClick={() => setIsEdit(true)}
          >
            Edytuj trening
          </button>
        </div>
        <SubmitButtons closeModal={closeModal} />
      </form>
    </div>
  );
};

export default EditTrainingForm;
