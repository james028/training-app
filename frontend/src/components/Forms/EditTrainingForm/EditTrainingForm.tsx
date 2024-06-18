import React, { useState } from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import EditLabelInput from "../../shared/EditLabelInput/EditLabelInput";
import FormInput from "../../shared/FormInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import EditButtons from "../EditButtons/EditButtons";
import FormTextArea from "../../shared/FormTextArea/FormTextArea";

export type RegistrationFormFields = {
  trainingType: string;
  duration: {
    hour: string;
    minutes: string;
    seconds: string;
  };
  bikeType?: string;
  bikeKilometers?: number;
  trainingTitle?: string;
  trainingDescription?: string;
};

const EditTrainingForm = ({ eventData, closeModal }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<RegistrationFormFields>({
    defaultValues: {
      trainingType: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      bikeKilometers: 0,
      bikeType: "",
      trainingTitle: "",
      trainingDescription: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

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
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
          <div className="mb-4">
            <EditLabelInput
              label={"Typ treningu"}
              isEdit={isEdit}
              childrenInput={
                <FormInputSelect<any>
                  id="trainingType"
                  // @ts-ignore
                  type="text"
                  name="trainingType"
                  label="Typ treningu"
                  placeholder="Typ treningu"
                  className="mb-2"
                  errors={errors}
                  rules={{ required: "Pole jest wymagane" }}
                  options={["Siłownia", "Rower"]}
                  defaultValue={eventData?.type}
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
                  errors={errors}
                  rules={{ required: "Pole jest wymagane" }}
                  // @ts-ignore
                  defaultValue={eventData?.duration}
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
                  errors={errors}
                  rules={{ required: "Pole jest wymagane" }}
                  options={["one", "two", "race80"]}
                  defaultValue={eventData?.bikeType}
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
                  type="number"
                  name="bikeKilometers"
                  label="Liczba kilometrów"
                  className="mb-2"
                  errors={errors}
                  rules={{
                    valueAsNumber: true,
                    required: "Pole jest wymagane",
                  }}
                  defaultValue={eventData?.bikeKilometers}
                />
              }
              eventDataField={eventData?.bikeKilometers}
            />
            <EditLabelInput
              label={"Tytuł treningu"}
              isEdit={isEdit}
              childrenInput={
                <FormInput<any>
                  id="trainingTitle"
                  // @ts-ignore
                  type="text"
                  name="trainingTitle"
                  label="Tytuł treningu"
                  className="mb-2"
                  errors={errors}
                  rules={{ required: "Pole jest wymagane" }}
                  defaultValue={eventData?.trainingTitle}
                />
              }
              eventDataField={eventData?.trainingTitle}
            />
            <EditLabelInput
              label={"Opis treningu"}
              isEdit={isEdit}
              childrenInput={
                <FormTextArea<any>
                  id="trainingDescription"
                  name="trainingDescription"
                  label="Opis treningu"
                  //placeholder=""
                  className="mb-2"
                  errors={errors}
                  rules={{
                    required: "Pole jest wymagane",
                    maxLength: {
                      value: 100,
                      //zmienic tlumaczenie
                      message:
                        "Description cannot be longer than 100 characters",
                    },
                  }}
                  // @ts-ignore
                  defaultValue={eventData?.trainingDescription}
                />
              }
              eventDataField={eventData?.trainingDescription}
            />
          </div>
          <EditButtons
            isEdit={isEdit}
            endEdit={() => setIsEdit(false)}
            startEdit={() => setIsEdit(true)}
          />
          <SubmitButtons closeModal={closeModal} />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditTrainingForm;
