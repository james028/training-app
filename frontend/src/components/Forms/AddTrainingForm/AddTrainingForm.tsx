import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../shared/FormInput/FormInput";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import FormTextArea from "../../shared/FormTextArea/FormTextArea";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import { useAppContext } from "../../../appContext/appContext";
import { useAddEditFormService } from "../../../hooks/useAddEditFormService/useAddEditFormService";

export type RegistrationFormFields = {
  trainingType: string;
  duration: {
    hour: string;
    minutes: string;
    seconds: string;
  };
  dateTime: DateTime;
  bikeType?: string;
  bikeKilometers?: number;
  title?: string;
  description?: string;
};

const AddTrainingForm = ({ closeModal, day, trainingDataType }: any) => {
  const { year, month } = useAppContext();

  const form = useForm<RegistrationFormFields>({
    defaultValues: {
      trainingType: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      dateTime: DateTime.now(),
      bikeType: "",
      bikeKilometers: 0,
      title: "",
      description: "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const { handleSubmitForm } = useAddEditFormService(
    { year, month, day },
    "add",
  );

  const onSubmit = handleSubmit(async (data: RegistrationFormFields) => {
    try {
      await handleSubmitForm(data);
      toast.success("Dodanie zapisane pomyślnie!");
      closeModal();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
  });

  const d = [{ type: "rower" }];

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <div className="shadow bg-white overflow-hidden w-full block p-8">
          <div className="mb-4">
            <FormInputSelect<any>
              id="trainingType"
              name="trainingType"
              label="Typ treningu"
              className="mb-2"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
              options={d.map((item: any) => {
                return {
                  value: item.trainingType,
                  name: item.type,
                };
              })}
            />
            <FormInputDuration<any>
              id="duration"
              type="number"
              name="duration"
              label="Długość treningu"
              className="mb-2"
              errors={errors}
              rules={{
                valueAsNumber: true,
                required: "Pole jest wymagane",
                maxLength: {
                  value: 2,
                  message: "Description cannot be longer than 100 characters",
                },
              }}
            />
            <FormInputSelect<any>
              id="bikeType"
              name="bikeType"
              label="Rodzaj roweru"
              className="mb-2"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
              options={[
                { type: "road", name: "Road bike" },
                { type: "mtb", name: "Mtb bike" },
              ].map((item) => ({
                value: item.type,
                name: item.name,
              }))}
            />
            <FormInput<any>
              id="bikeKilometers"
              // @ts-ignore
              type="number"
              name="bikeKilometers"
              label="Ilość kilometrów"
              placeholder="Ilość kilometrów"
              className="mb-2"
              register={register}
              errors={errors}
              rules={{
                valueAsNumber: true,
                validate: (value) => value > 0,
                required: "Pole jest wymagane",
              }}
            />
            <FormInput<any>
              id="title"
              // @ts-ignore
              type="text"
              name="title"
              label="Tytuł treningu"
              className="mb-2"
              errors={errors}
              rules={{ required: "Pole jest wymagane" }}
            />
            <FormTextArea<any>
              id="description"
              // @ts-ignore
              //type="text"
              name="description"
              label="Opis treningu"
              //placeholder="Opis treningu"
              className="mb-2"
              // @ts-ignore
              rows={5}
              errors={errors}
              rules={{
                required: "Pole jest wymagane",
                maxLength: {
                  value: 100,
                  message: "Description cannot be longer than 100 characters",
                },
              }}
            />
          </div>
        </div>
        <SubmitButtons closeModal={closeModal} submitTitle={"Dodaj"} />
      </form>
    </FormProvider>
  );
};

export default AddTrainingForm;
