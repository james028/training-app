import React, { useMemo, useState } from "react";
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
import { API_ENDPOINTS, URL } from "../../../constants";
import { useAddEditFormService } from "../../../hooks/useAddEditFormService/useAddEditFormService";
import { ActivityType } from "../../../types";
import useDeleteApi from "../../../hooks/api/delete/useApiDelete";
import { CALENDAR_KEYS } from "../../../constants/query-keys";

export type RegistrationFormFields = {
  //naprawić
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

interface EditTrainingFormProps {
  eventData: any;
  closeModal: () => void;
  day: string | null;
  trainingDataType: ActivityType[];
}

const EditTrainingForm = ({
  eventData,
  closeModal,
  day,
  trainingDataType,
}: EditTrainingFormProps) => {
  const { year, month, auth } = useAppContext();
  const token = auth?.data?.accessToken;

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<RegistrationFormFields>({
    defaultValues: useMemo(
      () => ({
        activity: eventData?.activity?.id || "",
        duration: eventData?.duration || { hour: "", minutes: "", seconds: "" },
        title: eventData?.title || "",
        description: eventData?.description || "",
        bikeType: eventData?.bikeType || "",
        bikeKilometers: eventData?.bikeKilometers || 0,
      }),
      [eventData],
    ),
  });
  const {
    handleSubmit,
    formState: { errors, dirtyFields },
  } = form;

  const { mutateAsync: removeMutateAsync } = useDeleteApi(
    `${URL}${API_ENDPOINTS.CALENDAR.DELETE_ACTIVITY(eventData?.id)}`,
    [
      CALENDAR_KEYS.calendarMonthlyList({
        year,
        month,
      }),
    ],
    null,
    { Authorization: `Bearer ${token}` },
  );

  console.log(eventData?.id);
  const { handleSubmitForm } = useAddEditFormService(
    { year, month, day: day ? Number(day) : 1 },
    "edit",
    eventData?.id,
  );

  const onSubmit = handleSubmit(async (data: RegistrationFormFields) => {
    try {
      if (Object.keys(dirtyFields).length === 0) {
        toast.custom("Nie wprowadzono żadnych zmian.");
        closeModal();
        return;
      }

      await handleSubmitForm(data, dirtyFields);
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
      await removeMutateAsync({});
      closeModal();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
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
                  id="activity"
                  // @ts-ignore
                  type="text"
                  name="activity"
                  label="Typ treningu"
                  placeholder="Typ treningu"
                  className="mb-2"
                  errors={errors}
                  rules={{ required: "Pole jest wymagane" }}
                  // otypować
                  options={trainingDataType.map((item) => {
                    return {
                      value: item.id,
                      name: item.activityName,
                    };
                  })}
                  defaultValue={eventData?.activity?.id}
                />
              }
              eventDataField={eventData?.activity?.activityName}
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
                  rules={{}}
                  options={[
                    { type: "road", name: "Road bike" },
                    { type: "mtb", name: "Mtb bike" },
                  ].map((item) => ({
                    value: item.type,
                    name: item.name,
                  }))}
                  defaultValue={"Road bike"}
                />
              }
              eventDataField={"Road bike"}
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
                  rules={{}}
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
                  rules={
                    //     {
                    //   required: "Pole jest wymagane",
                    //   maxLength: {
                    //     value: 100,
                    //     //zmienic tlumaczenie
                    //     message:
                    //       "Description cannot be longer than 100 characters",
                    //   },
                    // }
                    {}
                  }
                  // @ts-ignore
                  defaultValue={eventData?.description}
                />
              }
              eventDataField={eventData?.description}
            />
          </div>
          <button type="button" onClick={handleRemove}>
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
