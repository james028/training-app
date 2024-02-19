import React, { useState } from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import EditLabelInput from "../../shared/EditLabelInput/EditLabelInput";
import FormInput from "../../shared/FormInput/FormInput";
import { useForm } from "react-hook-form";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import EditButtons from "../EditButtons/EditButtons";

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
      trainingTitle: "",
      trainingDescription: "",
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
              <FormInputSelect<any>
                id="trainingType"
                // @ts-ignore
                type="text"
                name="trainingType"
                label="Typ treningu"
                placeholder="Typ treningu"
                className="mb-2"
                register={register}
                //errors={errors}
                //rules={{ required: "You must enter your first name.1111" }}
                options={["Siłownia", "Rower"]}
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
                // errors={errors}
                // rules={{ required: "You must enter your Długość treningu." }}
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
                type="number"
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
                placeholder=""
                className="mb-2"
                register={register}
                // errors={errors}
                // rules={{
                //   valueAsNumber: true,
                //   required: "You must enter your tytuł tgreningu",
                // }}
              />
            }
            eventDataField={eventData?.trainingTitle}
          />
        </div>
        <EditButtons
          isEdit={isEdit}
          endEdit={() => setIsEdit(false)}
          startEdit={() => setIsEdit(true)}
        />
        <SubmitButtons closeModal={closeModal} />
      </form>
    </div>
  );
};

export default EditTrainingForm;
