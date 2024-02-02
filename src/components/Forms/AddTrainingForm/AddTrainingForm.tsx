import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { useForm } from "react-hook-form";
import FormInput from "../../shared/FormInput/FormInput";
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
const AddTrainingForm = ({ closeModal }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    },
  });

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
        <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
          <div className="mb-4">
            <FormInput<RegistrationFormFields>
              id="trainingType"
              // @ts-ignore
              type="text"
              name="trainingType"
              label="Typ treningu"
              placeholder="Typ treningu"
              className="mb-2"
              register={register}
              rules={{ required: "You must enter your first name." }}
              // @ts-ignore
              errors={errors}
            />
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
            <FormInputSelect<RegistrationFormFields>
              id="bikeType"
              // @ts-ignore
              type="select"
              name="bikeType"
              label="Rodzaj roweru"
              placeholder="Rodzaj roweru"
              className="mb-2"
              register={register}
              rules={{ required: "You must enter your first name." }}
              // @ts-ignore
              errors={errors}
              options={["one", "two"]}
            />
            <FormInput<RegistrationFormFields>
              id="bikeKilometers"
              // @ts-ignore
              type="number"
              name="bikeKilometers"
              label="Ilość kilometrów"
              placeholder="Ilość kilometrów"
              className="mb-2"
              register={register}
              rules={{
                valueAsNumber: true,
                required: "You must enter your Ilość kilometrów.",
              }}
              // @ts-ignore
              errors={errors}
            />
          </div>
        </div>
        <SubmitButtons closeModal={closeModal} />
      </form>
    </>
  );
};

export default AddTrainingForm;
