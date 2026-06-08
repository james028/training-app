import usePostApi from "../../../hooks/api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../../constants";
import usePatchApi from "../../../hooks/api/patch/useApiPatch";
import { CHECKLIST_KEYS } from "../../../constants/query-keys";
import useDeleteApi from "../../../hooks/api/delete/useApiDelete";
import useGetApi from "../../../hooks/api/get/useApiGet";
import { useAppContext } from "../../../appContext/appContext";

type Item = {
  id: string;
  text: string;
  order: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoSet = {
  id: string;
  name: string;
  order: number;
  items: Item[];
};

type SetsResponse = {
  sets: TodoSet[];
};

export const useChecklist = () => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;

  // 1. Pobieranie listy (możesz tu dodać logikę transformacji danych)
  const query = useGetApi<SetsResponse>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.LIST}`,
    queryKey: CHECKLIST_KEYS.checkList(),
    headers: { Authorization: `Bearer ${token}` },
  });

  const createSet = usePostApi({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.CREATE_SET}`,
    invalidateKeys: [CHECKLIST_KEYS.checkList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const createItem = usePostApi({
    invalidateKeys: [CHECKLIST_KEYS.checkList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const updateItem = usePatchApi({
    invalidateKeys: [CHECKLIST_KEYS.checkList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const removeItem = useDeleteApi(
    [CHECKLIST_KEYS.checkList()],
    undefined,
    null,
    {
      Authorization: `Bearer ${token}`,
    },
  );

  const removeSet = useDeleteApi(
    [CHECKLIST_KEYS.checkList()],
    undefined,
    null,
    {
      Authorization: `Bearer ${token}`,
    },
  );

  console.log(query, "query");
  return {
    ...query,
    checkListItems: query.data?.sets ?? [],
    createSet,
    createItem,
    updateItem,
    removeItem,
    removeSet,
  };
};
