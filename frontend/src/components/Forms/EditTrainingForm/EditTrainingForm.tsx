import React, { useState } from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import EditLabelInput from "../../shared/EditLabelInput/EditLabelInput";
import FormInput from "../../shared/FormInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import FormInputSelect from "../../shared/FormInputSelect/FormInputSelect";
import FormInputDuration from "../../shared/FormInputDuration/FormInputDuration";
import EditButtons from "../EditButtons/EditButtons";
import FormTextArea from "../../shared/FormTextArea/FormTextArea";
import { useAppContext } from "../../../appContext/appContext";
import toast from "react-hot-toast";
import usePostApi from "../../../hooks/api/post/useApiPost";
import { URL } from "../../../constants";
import { DateTime } from "luxon";
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

const EditTrainingForm = ({
  eventData,
  closeModal,
  day,
  trainingDataType,
}: any) => {
  const { year, month } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<RegistrationFormFields>({
    defaultValues: {
      trainingType: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      dateTime: DateTime.now(),
      bikeKilometers: 0,
      bikeType: "",
      title: "",
      description: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const linkRemove = "api/calendar/delete";
  const { mutateAsync: mutateAsyncRemove } = usePostApi({
    link: `${URL}${linkRemove}/${eventData.id}`,
    queryKey: ["removeExistTraining"],
  });

  const { handleSubmitForm } = useAddEditFormService(
    { year, month, day },
    "edit",
    eventData,
  );

  const onSubmit = handleSubmit(async (data: RegistrationFormFields) => {
    try {
      await handleSubmitForm(data);
      toast.success("Edycja zapisana pomyślnie!");
      setIsEdit(false);
      closeModal();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
  });

  const handleRemove = async () => {
    try {
      await mutateAsyncRemove({
        bodyData: {
          year,
          month,
          day,
        },
      });
    } catch (error) {}
  };

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
                  options={trainingDataType.map((item: any) => {
                    return {
                      value: item.trainingType,
                      name: item.type,
                    };
                  })}
                  defaultValue={eventData?.trainingType}
                />
              }
              eventDataField={eventData?.trainingType}
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
                  options={[
                    { type: "road", name: "Road bike" },
                    { type: "mtb", name: "Mtb bike" },
                  ].map((item) => ({
                    value: item.type,
                    name: item.name,
                  }))}
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
                  id="title"
                  // @ts-ignore
                  type="text"
                  name="title"
                  label="Tytuł treningu"
                  className="mb-2"
                  errors={errors}
                  rules={{ required: "Pole jest wymagane" }}
                  defaultValue={eventData?.title}
                />
              }
              eventDataField={eventData?.title}
            />
            <EditLabelInput
              label={"Opis treningu"}
              isEdit={isEdit}
              childrenInput={
                <FormTextArea<any>
                  id="description"
                  name="description"
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
                  defaultValue={eventData?.description}
                />
              }
              eventDataField={eventData?.description}
            />
          </div>
          <button type="button" onClick={() => handleRemove()}>
            Usuń
          </button>
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
