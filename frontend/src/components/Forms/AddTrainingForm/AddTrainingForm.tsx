import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../shared/FormInput/FormInput";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import FormTextArea from "../../shared/FormTextArea/FormTextArea";
import usePostApi from "../../../hooks/api/post/useApiPost";
import useGetApi from "../../../hooks/api/get/useApiGet";
import { useAppContext } from "../../../appContext/appContext";

export type RegistrationFormFields = {
  trainingType: string;
  duration: {
    hour: string;
    minutes: string;
    seconds: string;
  };
  bikeType?: string;
  bikeKilometers?: number;
  title?: string;
  description?: string;
};

const URL = "http://localhost:5001/";

const AddTrainingForm = ({ closeModal, day }: any) => {
  const { monthIndex } = useAppContext();

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
      title: "",
      description: "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const linkCreate = "api/calendar/create";
  const linkTrainingType = "api/training-type/list";

  console.log(linkTrainingType);
  const { data: dataTrainingType } = useGetApi(
    `${URL}${linkTrainingType}`,
    ["trainingTypeList"],
    undefined,
  );
  const { mutation } = usePostApi(
    `${URL}${linkCreate}`,
    ["createNewTraining"],
    null,
  );

  const onSubmit = handleSubmit(async (data: RegistrationFormFields) => {
    const sendData = {
      ...data,
      //to do utils
      duration: Object.values(data.duration)
        .map((duration) => duration.toString().padStart(2, "0"))
        .join(":"),
      month: monthIndex,
      day,
    };

    mutation.mutate({ paramsObj: null, bodyData: sendData });

    setTimeout(async () => {
      closeModal();
      //refetch funkcji calendar-list
      //await refetch?.();
    }, 500);
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
                options={
                  dataTrainingType.length > 0 &&
                  //zmienic typowanie
                  dataTrainingType?.map((e: any) => {
                    console.log(e, "e");

                    return {
                      value: e.value,
                      name: e.trainingName,
                    };
                  })
                }
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
                //options={["one", "two"]}
                options={[
                  { type: "rower", trainingType: "Rower" },
                  { type: "airbike", trainingType: "Airbike" },
                ].map((e) => ({
                  value: e.type,
                  name: e.trainingType,
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
    </>
  );
};

export default AddTrainingForm;
