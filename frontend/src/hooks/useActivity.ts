// hooks/activityTypes.ts

import usePatchApi from "./api/patch/useApiPatch";
import useGetApi from "./api/get/useApiGet";
import { CALEDAR_KEYS } from "../constants/query-keys";
import { useAppContext } from "../appContext/appContext";
import { URL } from "../constants";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
}

export type ActivityType = {
  id: string;
  type: string;
  activityName: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export const API_ENDPOINTS = {
  ACTIVITIES: {
    ACTIVITY_BASE: "api/activity-type/list",
    //CREATE: "api/activity-type/create",
    ACTIVITY_BASE_EDIT: (id: string) => `api/activity-type/edit/${id}`,
    //REMOVE: (id: string) => `api/activity-type/remove/${id}`,
  },
};
//const ACTIVITY_BASE = "api/activity-type/list";
//const ACTIVITY_BASE_EDIT = "api/activity-type/list";
const ACTIVITY_KEYS = {
  list: ["activityTypes", "list"] as const,
  detail: (id: string) => ["activityTypes", "detail", id] as const,
};

export const useActivityTypes = () => {
  // console.log(
  //   "Mój link to:",
  //   `${URL}${API_ENDPOINTS.ACTIVITIES.ACTIVITY_BASE}`,
  // );
  return useGetApi<ApiResponse<ActivityType[]>>({
    // link: ACTIVITY_BASE,
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.ACTIVITY_BASE}`,
    queryKey: ACTIVITY_KEYS.list,
    //staleTime: 1000 * 15, // 15 sekund – do testów możesz dać 0
  });
};

export const useUpdateActivityType = (editingId?: string) => {
  console.log(editingId);
  const { year, month, changeMonth, auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const paramsFilters = { year, month };
  return usePatchApi({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.ACTIVITY_BASE_EDIT(editingId ?? "")}`,
    invalidateKeys: [CALEDAR_KEYS.calendarMonthlyList(paramsFilters)],
  });
};
