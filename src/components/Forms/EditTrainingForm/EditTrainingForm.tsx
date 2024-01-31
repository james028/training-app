import React, { useState } from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import EditLabelInput from "../../shared/EditLabelInput/EditLabelInput";
import FormInput from "../../shared/FormInput/FormInput";
import { RegistrationFormFields } from "../AddTrainingForm/AddTrainingForm";

const EditTrainingForm = ({ eventData, closeModal }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
      <div className="mb-4">
        <EditLabelInput
          label={"Typ treningu"}
          isEdit={isEdit}
          childrenInput={
            <FormInput<RegistrationFormFields>
              id="trainingType"
              // @ts-ignore
              type="text"
              name="trainingType"
              label="Typ treningu"
              placeholder="Typ treningu"
              className="mb-2"
              //register={register}
              rules={{ required: "You must enter your first name." }}
              //errors={errors}
            />
          }
          eventDataField={eventData?.type}
        />
        {/*<label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">*/}
        {/*  Typ treningu*/}
        {/*</label>*/}
        {/*{isEdit ? (*/}
        {/*  <input*/}
        {/*    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"*/}
        {/*    type="text"*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <p className="text-base text-neutral-600 dark:text-neutral-200">*/}
        {/*    {eventData?.type ?? "-"}*/}
        {/*  </p>*/}
        {/*)}*/}
        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
          Długość treningu
        </label>
        {isEdit ? (
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
          />
        ) : (
          <p className="text-base text-neutral-600 dark:text-neutral-200">
            {eventData?.duration ?? "-"}
          </p>
        )}
        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
          Rodzaj roweru
        </label>
        {isEdit ? (
          <input
            className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
            placeholder={"testtest"}
          />
        ) : (
          <p className="text-base text-neutral-600 dark:text-neutral-200">
            {eventData?.bikeType ?? "-"}
          </p>
        )}
        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
          Ilość kilometrów
        </label>
        {isEdit ? (
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
          />
        ) : (
          <p className="text-base text-neutral-600 dark:text-neutral-200">
            {eventData?.bikeKilometers ?? "-"}
          </p>
        )}
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
    </div>
  );
};

export default EditTrainingForm;
