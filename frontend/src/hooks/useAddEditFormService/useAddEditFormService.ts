import usePostApi from "../api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../constants";
import useGetApi from "../api/get/useApiGet";
import {
  convertObjectWithNumbersToString,
  createDateTime,
  removeNullValues,
} from "../../utils";
import { RegistrationFormFields } from "../../components/Forms/EditTrainingForm/EditTrainingForm";
import { CALENDAR_KEYS } from "../../constants/query-keys";
import { useAppContext } from "../../appContext/appContext";
import usePatchApi from "../api/patch/useApiPatch";

const mapFormDataToBody = (
  data: RegistrationFormFields,
  type: "add" | "edit",
  dateObject: { year: number; month: number; day: number },
  eventData?: Record<string, any>,
) => {
  const { year, month, day } = dateObject;

  console.log(type, "type");
  const baseData = removeNullValues({
    ...data,
    duration: convertObjectWithNumbersToString(data.duration),
    activityDate: createDateTime(year, month, day),
  });

  console.log("edit 111111111111", eventData);
  if (type === "edit" && eventData?.id) {
    // zrobić poprawny payload
    return {
      ...baseData,
      taskId: eventData.id,
    };
  }

  return baseData;
};

export const useAddEditFormService = (
  dateObject: { year: number; month: number; day: number },
  type: "add" | "edit",
  eventData?: { id: string } & Record<string, any>,
): { handleSubmitForm: (data: any) => Promise<void> } => {
  console.log(type, "type");
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const { year, month } = dateObject;

  // /const paramsFilters = {}
  const { mutateAsync: addMutateAsync } = usePostApi({
    link: `${URL}${API_ENDPOINTS.CALENDAR.CREATE_ACTIVITY}`,
    invalidateKeys: [CALENDAR_KEYS.calendarMonthlyList(dateObject)],
    headers: { Authorization: `Bearer ${token}` },
  });

  const linkEdit = "api/calendar/edit";

  console.log(eventData?.id, "idddd");
  const { mutateAsync: editMutateAsync } = usePatchApi<any, any, any>({
    //link: `${URL}${linkEdit}`,
    link: `${URL}${API_ENDPOINTS.CALENDAR.EDIT_ACTIVITY(eventData?.id ?? "69e6631f0ece4d089eca6f9c")}`,
    //invalidateKeys: [["editAddedTraining"]],
    //invalidateKeys: [CALENDAR_KEYS.editCalendarActivity()],
    invalidateKeys: [CALENDAR_KEYS.calendarMonthlyList(dateObject)],
    headers: { Authorization: `Bearer ${token}` },
  });

  const paramsFilters = { year, month };
  //tu poprawić z tym refetchem
  const { refetch: refetchCalendarData } = useGetApi<any>({
    link: `${URL}${API_ENDPOINTS.CALENDAR.MONTHLY_LIST}`,
    queryKey: CALENDAR_KEYS.calendarMonthlyList(paramsFilters),
    paramsObject: paramsFilters,
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleSubmitForm = async (data: RegistrationFormFields) => {
    const mutators = {
      add: addMutateAsync,
      edit: editMutateAsync,
    };
    const currentMutate = mutators[type];

    if (!currentMutate) {
      throw new Error(`Nieznany typ akcji formularza: ${type}`);
    }
    const bodyData = mapFormDataToBody(data, type, dateObject, eventData);

    try {
      await currentMutate({ bodyData });
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
