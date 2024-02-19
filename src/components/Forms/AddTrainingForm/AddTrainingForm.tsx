import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<RegistrationFormFields>({
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

  console.log(defaultValues?.bikeKilometers, "d");

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
      <form onSubmit={onSubmit}>
        <div className="shadow bg-white overflow-hidden w-full block p-8">
          <div className="mb-4">
            <FormInputSelect<any>
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
              options={["Rower", "Siłownia"]}
            />
            <FormInputDuration<any>
              id="duration"
              type="number"
              name="duration"
              label="Długość treningu"
              className="mb-2"
              register={register}
              errors={errors}
              rules={{ required: "You must enter your Długość treningu." }}
            />
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
              rules={{ required: "You must enter your first name.22" }}
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
                required: "You must enter your Ilość kilometrów.333",
              }}
            />
            <FormInput<any>
              id="trainingTitle"
              // @ts-ignore
              type="text"
              name="trainingTitle"
              label="Tytuł treningu"
              placeholder=""
              className="mb-2"
              register={register}
              errors={errors}
              rules={{
                required: "You must enter your tytuł tgreningu",
              }}
            />
            <FormTextArea<any>
              id="trainingDescription"
              // @ts-ignore
              type="text"
              name="trainingDescription"
              label="Opis treningu"
              placeholder="Opis treningu"
              className="mb-2"
              rows={5}
              register={register}
              errors={errors}
              rules={{ required: "You must enter test area" }}
            />
          </div>
        </div>
        <SubmitButtons closeModal={closeModal} />
      </form>
    </>
  );
};

export default AddTrainingForm;
