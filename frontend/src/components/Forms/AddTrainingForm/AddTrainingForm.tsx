import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../shared/FormInput/FormInput";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
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

const AddTrainingForm = ({ closeModal }: any) => {
  const form = useForm<RegistrationFormFields>({
    defaultValues: {
      trainingType: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      bikeType: "",
      bikeKilometers: 0,
      trainingTitle: "",
      trainingDescription: "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit((data: RegistrationFormFields) => {
    console.log("submitting...", data);

    //tutaj funkcja na be na async/await

    //tu lepiej
    let newData: any = { ...data };

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
    <>
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
                options={["Rower", "Siłownia"]}
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
                options={["one", "two"]}
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
                id="trainingTitle"
                // @ts-ignore
                type="text"
                name="trainingTitle"
                label="Tytuł treningu"
                className="mb-2"
                errors={errors}
                rules={{ required: "Pole jest wymagane" }}
              />
              <FormTextArea<any>
                id="trainingDescription"
                // @ts-ignore
                //type="text"
                name="trainingDescription"
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
          <SubmitButtons closeModal={closeModal} />
        </form>
      </FormProvider>
    </>
  );
};

export default AddTrainingForm;
