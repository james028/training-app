import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { useForm } from "react-hook-form";
import FormInput from "../../shared/FormInput/FormInput";

export type RegistrationFormFields = {
  trainingType: string;
  bikeType?: string;
  bikeKilometers?: string;
  duration: string;
};
const AddTrainingForm = ({ closeModal }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const onSubmit = handleSubmit((data: any) => {
    console.log("submitting...", data);
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
              errors={errors}
            />
            <FormInput<RegistrationFormFields>
              id="trainingType"
              // @ts-ignore
              type="text"
              name="trainingType"
              label="Długość treningu"
              placeholder="trainingType"
              className="mb-2"
              register={register}
              rules={{ required: "You must enter your first name." }}
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
