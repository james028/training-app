import usePostApi from "../api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../constants";
import {
  convertObjectWithNumbersToString,
  createDateTime,
  isDurationEmpty,
  normalizeDate,
} from "../../utils";
import { RegistrationFormFields } from "../../components/Forms/EditTrainingForm/EditTrainingForm";
import { CALENDAR_KEYS } from "../../constants/query-keys";
import { useAppContext } from "../../appContext/appContext";
import usePatchApi from "../api/patch/useApiPatch";
import toast from "react-hot-toast";

type CreateActivityDTO = {
  duration?: string;
  trainingType: string;
  bikeType?: string;
  title: string;
  description?: string;
  bikeKilometers?: number;
  activityDate: string;
};

type UpdateActivityDTO = Partial<CreateActivityDTO>;

type ActionType = "add" | "edit";

const mapFormDataToBody = (
  data: RegistrationFormFields,
  dirtyFields: Partial<Record<keyof RegistrationFormFields, boolean>>,
  dateObject: { year: number; month: number; day: number },
  type: "add" | "edit",
): UpdateActivityDTO => {
  const { year, month, day } = normalizeDate(dateObject);

  const body: UpdateActivityDTO = {};

  const setActivityDate = () => createDateTime(year, month, day);

  if (type === "add") {
    body.activityDate = setActivityDate();
  }

  for (const key in dirtyFields) {
    if (!dirtyFields[key as keyof RegistrationFormFields]) continue;

    // Kluczowe: ignorujemy tutaj duration, obsłużymy je osobno
    if (key === "duration") continue;

    const typedKey = key as keyof RegistrationFormFields;
    body[typedKey] = data[typedKey] as any;
  }

  // 2. Osobna logika dla duration (niezależna od dirtyFields)
  // Jeśli jest wypełnione - wysyłamy. Jeśli puste - ignorujemy.
  if (!isDurationEmpty(data.duration)) {
    body.duration = convertObjectWithNumbersToString(data.duration);
  }

  return body;
};

export const useAddEditFormService = (
  dateObject: { year: number; month: number; day: number },
  type: "add" | "edit",
  id?: string,
): { handleSubmitForm: (data: any, dirtyFields: any) => Promise<void> } => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;

  const { year, month } = dateObject;

  if (type === "edit" && !id) {
    console.error("Logic Error: Attempted to edit without an ID.");
    toast.error("Brak id dla edycji");
  }

  const addActivity = usePostApi({
    link: `${URL}${API_ENDPOINTS.CALENDAR.CREATE_ACTIVITY}`,
    invalidateKeys: [CALENDAR_KEYS.calendarMonthlyList({ year, month })],
    headers: { Authorization: `Bearer ${token}` },
  });

  const { mutateAsync: editMutateAsync } = usePatchApi<any, any, any>({
    invalidateKeys: [CALENDAR_KEYS.calendarMonthlyList({ year, month })],
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleSubmitForm = async (
    data: RegistrationFormFields,
    dirtyFields: Partial<Record<keyof RegistrationFormFields, boolean>>,
  ) => {
    const bodyData = mapFormDataToBody(data, dirtyFields, dateObject, type);

    if (type === "edit" && Object.keys(bodyData).length === 0) {
      console.log("No changes detected - skipping update");
      return;
    }

    try {
      const mutators = {
        add: () => addActivity.mutateAsync({ bodyData }),
        edit: () =>
          editMutateAsync({
            bodyData,
            customLink: `${URL}${API_ENDPOINTS.CALENDAR.EDIT_ACTIVITY(id)}`,
          }),
      };
      if (!mutators[type]) {
        //throw new Error(`Nieznany typ akcji formularza: ${type}`);
        toast.error(`Nieznany typ akcji formularza: ${type}`);
      }
      await mutators[type as ActionType]();
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
