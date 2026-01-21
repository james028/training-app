import usePostApi from "../api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../constants";
import useGetApi from "../api/get/useApiGet";
import {
  convertObjectWithNumbersToString,
  createDateTime,
  removeNullValues,
} from "../../utils";
import { RegistrationFormFields } from "../../components/Forms/EditTrainingForm/EditTrainingForm";
import { CALEDAR_KEYS } from "../../constants/query-keys";
import { useAppContext } from "../../appContext/appContext";

const mapFormDataToBody = (
  data: RegistrationFormFields,
  type: "add" | "edit",
  dateObject: { year: number; month: number; day: number },
  eventData?: Record<string, any>,
) => {
  const { year, month, day } = dateObject;
  const baseData = removeNullValues({
    ...data,
    duration: convertObjectWithNumbersToString(data.duration),
    activityDate: createDateTime(year, month, day),
  });

  if (type === "edit" && eventData?.id) {
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
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const { year, month } = dateObject;

  const { mutateAsync: addMutateAsync } = usePostApi({
    link: `${URL}${API_ENDPOINTS.CALENDAR.CREATE_ACTIVITY}`,
    queryKey: CALEDAR_KEYS.createCalendarActivity(),
    headers: { Authorization: `Bearer ${token}` },
  });

  const linkEdit = "api/calendar/edit";
  const { mutateAsync: editMutateAsync } = usePostApi<any, any, any>({
    link: `${URL}${linkEdit}`,
    queryKey: ["editAddedTraining"],
  });

  const paramsFilters = { year, month };
  const { refetch: refetchCalendarData } = useGetApi<any>({
    link: `${URL}${API_ENDPOINTS.CALENDAR.MONTHLY_LIST}`,
    queryKey: CALEDAR_KEYS.calendarMonthlyList(paramsFilters),
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
