import usePostApi from "../api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../constants";
import useGetApi from "../api/get/useApiGet";
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
    toast.error("Brak id for edit");
  }

  const { mutateAsync: addMutateAsync } = usePostApi({
    link: `${URL}${API_ENDPOINTS.CALENDAR.CREATE_ACTIVITY}`,
    invalidateKeys: [CALENDAR_KEYS.calendarMonthlyList(dateObject)],
    headers: { Authorization: `Bearer ${token}` },
  });

  const linkEdit = "api/calendar/edit";
  const { mutateAsync: editMutateAsync } = usePatchApi<any, any, any>({
    //link: `${URL}${linkEdit}`,
    link: `${URL}${API_ENDPOINTS.CALENDAR.EDIT_ACTIVITY(id!)}`,
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

  const handleSubmitForm = async (
    data: RegistrationFormFields,
    dirtyFields: Partial<Record<keyof RegistrationFormFields, boolean>>,
  ) => {
    const mutators = {
      add: addMutateAsync,
      edit: editMutateAsync,
    };
    const currentMutate = mutators[type];

    if (!currentMutate) {
      //throw new Error(`Nieznany typ akcji formularza: ${type}`);
      toast.error(`Nieznany typ akcji formularza: ${type}`);
    }
    const bodyData = mapFormDataToBody(data, dirtyFields, dateObject, type);

    if (type === "edit" && Object.keys(bodyData).length === 0) {
      console.log("No changes detected - skipping update");
      return;
    }

    try {
      await currentMutate({ bodyData });
      //pokombinować jako invalide
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

//invalidate key
//to w id w kalendarzu +
//backend do edycji +
//calendar - czy id number czy string - sugerowane string w id +
//jesli edycja to typ aktywnosci wypełniony w select +
