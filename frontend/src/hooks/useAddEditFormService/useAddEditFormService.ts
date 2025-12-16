import usePostApi from "../api/post/useApiPost";
import { URL } from "../../constants";
import useGetApi from "../api/get/useApiGet";
import { convertObjectWithNumbersToString } from "../../utils";
import { RegistrationFormFields } from "../../components/Forms/EditTrainingForm/EditTrainingForm";

const mapFormDataToBody = (
  data: RegistrationFormFields,
  dateObject: { year: string; month: string; day: string },
  type: "add" | "edit",
  eventData?: Record<string, any>,
) => {
  const baseData = {
    ...data,
    duration: convertObjectWithNumbersToString(data.duration),
    ...dateObject,
  };

  if (type === "edit" && eventData?.id) {
    return {
      ...baseData,
      taskId: eventData.id,
    };
  }

  return baseData;
};

export const useAddEditFormService = (
  dateObject: { year: string; month: string; day: string },
  type: "add" | "edit",
  eventData?: { id: string } & Record<string, any>,
): { handleSubmitForm: (data: RegistrationFormFields) => Promise<void> } => {
  const { year, month } = dateObject;

  const linkCreate = "api/calendar/create";
  const { mutateAsync: addMutateAsync } = usePostApi({
    link: `${URL}${linkCreate}`,
    queryKey: ["createNewTraining"],
    invalidateKeys: ["calendarDataList"],
  });

  const linkEdit = "api/calendar/edit";
  const { mutateAsync: editMutateAsync } = usePostApi<any, any, any>({
    link: `${URL}${linkEdit}`,
    queryKey: ["editAddedTraining"],
  });

  const link = "api/calendar/list";
  const { refetch: refetchCalendarData } = useGetApi<any>({
    url: `${URL}${link}`,
    queryKey: ["calendarDataList", year, month],
    paramsObject: { year, month },
  });

  const mutators = {
    add: addMutateAsync,
    edit: editMutateAsync,
  };

  const handleSubmitForm = async (data: RegistrationFormFields) => {
    const bodyData = mapFormDataToBody(data, dateObject, type, eventData);
    const currentMutate = mutators[type];

    if (!currentMutate) {
      throw new Error(`Nieznany typ akcji formularza: ${type}`);
    }

    try {
      await currentMutate({ bodyData });
      console.log("HOOK SERWISOWY: Udało się wykonać mutację."); // <- Ten powinien się pojawić, jeśli mutacja resolve
      await refetchCalendarData();
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Błąd zapisu");
      throw new Error(
        error instanceof Error
          ? error.message
          : "Wystąpił nieznany błąd podczas zapisu.",
      );
    }
  };

  return { handleSubmitForm };
};
