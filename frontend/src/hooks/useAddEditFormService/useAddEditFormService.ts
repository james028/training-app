import usePostApi from "../api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../constants";
import useGetApi from "../api/get/useApiGet";
import {
  convertObjectWithNumbersToString,
  createDateTime,
  normalizeDate,
} from "../../utils";
import { RegistrationFormFields } from "../../components/Forms/EditTrainingForm/EditTrainingForm";
import { CALENDAR_KEYS } from "../../constants/query-keys";
import { useAppContext } from "../../appContext/appContext";
import usePatchApi from "../api/patch/useApiPatch";

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

    //const typedKey = key as keyof RegistrationFormFields;

    const typedKey = key as keyof RegistrationFormFields;
    const value = data[typedKey];
    switch (typedKey) {
      case "duration":
        // 2. Bezpiecznik: Jeśli używasz obiektu, RHF mógł go błędnie oznaczyć jako dirty
        // Możesz dodać proste sprawdzenie, czy wartość w ogóle jest różna od pustej/domyślnej
        // Poniżej przykładowy warunek, który możesz dostosować do swojej struktury duration:
        const stringDuration = convertObjectWithNumbersToString(value);

        // Jeśli Twoja funkcja zwraca np. "00:00:00" dla pustego czasu,
        // to nie wysyłaj tego, jeśli nie trzeba:
        if (stringDuration === "00:00:00" && type === "edit") continue;

        body.duration = stringDuration;
        break;
      default:
        // @ts-ignore
        body[typedKey] = data[typedKey] as any;
    }
  }

  return body;
};

export const useAddEditFormService = (
  dateObject: { year: number; month: number; day: number },
  type: "add" | "edit",
  id?: string,
): { handleSubmitForm: (data: any, dirtyFields: any) => Promise<void> } => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const { year, month } = dateObject;

  const { mutateAsync: addMutateAsync } = usePostApi({
    link: `${URL}${API_ENDPOINTS.CALENDAR.CREATE_ACTIVITY}`,
    invalidateKeys: [CALENDAR_KEYS.calendarMonthlyList(dateObject)],
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log();
  const linkEdit = "api/calendar/edit";
  const { mutateAsync: editMutateAsync } = usePatchApi<any, any, any>({
    //link: `${URL}${linkEdit}`,
    link: `${URL}${API_ENDPOINTS.CALENDAR.EDIT_ACTIVITY(id ?? "")}`,
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
      throw new Error(`Nieznany typ akcji formularza: ${type}`);
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
