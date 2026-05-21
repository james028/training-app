import usePatchApi from "./api/patch/useApiPatch";
import useGetApi from "./api/get/useApiGet";
import { ACTIVITY_KEYS, CALENDAR_KEYS } from "../constants/query-keys";
import { useAppContext } from "../appContext/appContext";
import { API_ENDPOINTS, URL } from "../constants";
import usePostApi from "./api/post/useApiPost";
import useDeleteApi from "./api/delete/useApiDelete";
import { ActivityType, ApiResponse } from "../types";

export const useActivityTypes = () => {
  return useGetApi<ApiResponse<ActivityType[]>>({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.LIST}`,
    queryKey: ACTIVITY_KEYS.activityTypeList(),
  });
};

export const useCreateActivityType = () => {
  return usePostApi({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.CREATE}`,
    invalidateKeys: [ACTIVITY_KEYS.activityTypeList()],
  });
};

export const useUpdateActivityType = (editingId: string | null) => {
  const { year, month } = useAppContext();
  const paramsFilters = { year, month };

  return usePatchApi({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.EDIT(editingId)}`,
    invalidateKeys: [
      CALENDAR_KEYS.calendarMonthlyList(paramsFilters),
      ACTIVITY_KEYS.activityTypeList(),
    ],
  });
};

export const useDeleteActivityType = (removingId: string | null) => {
  return useDeleteApi<any, any, any>(
    `${URL}${API_ENDPOINTS.ACTIVITIES.REMOVE(removingId)}`,
    [
      ACTIVITY_KEYS.removeActivity(removingId),
      ACTIVITY_KEYS.activityTypeList(),
    ],
  );
};
