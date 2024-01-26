import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { useForm } from "react-hook-form";
import FormInput from "../../shared/FormInput/FormInput";

export type RegistrationFormFields = {
  type: string;
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
        <FormInput<RegistrationFormFields>
          // @ts-ignore
          id="type"
          type="text"
          name="type"
          label="Type"
          placeholder="Type"
          className="mb-2"
          register={register}
          rules={{ required: "You must enter your first name." }}
          errors={errors}
        />
        <SubmitButtons closeModal={closeModal} />
        <button type={"submit"}>Add</button>
      </form>
      {/*<div className="md:p-8 mb-2">*/}
      {/*  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">*/}
      {/*    <div className="md:col-span-5">*/}
      {/*      <label htmlFor="full_name">Typ treningu</label>*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        name="full_name"*/}
      {/*        id="full_name"*/}
      {/*        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"*/}
      {/*        value=""*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="md:col-span-5">*/}
      {/*      <label htmlFor="full_name">Długość treningu</label>*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        name="full_name"*/}
      {/*        id="full_name"*/}
      {/*        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"*/}
      {/*        value=""*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default AddTrainingForm;
