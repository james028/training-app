import useGetApi from "../../../hooks/api/get/useApiGet";
import { ActivityType } from "../ActivityTypeList/ActivityTypeList";
import { API_ENDPOINTS, URL } from "../../../constants";
import { ACTIVITY_KEYS } from "../../../constants/query-keys";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { useState } from "react";
import usePostApi from "../../../hooks/api/post/useApiPost";
import usePatchApi from "../../../hooks/api/patch/useApiPatch";
import useDeleteApi from "../../../hooks/api/delete/useApiDelete";
import { stringToCamelCaseString } from "../../../utils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { activitySchema } from "../schemas";

interface ActivityTypeFormProps {
  activityName: string;
  color: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
}
export const useActivityType = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);

  const form = useForm<ActivityTypeFormProps>({
    defaultValues: {
      activityName: "",
      color: "",
    },
    resolver: useYupValidationResolver<ActivityTypeFormProps>(activitySchema),
    mode: "onTouched",
  });
  const { reset, setValue } = form;

  const {
    data: activityTypeData,
    refetch,
    isLoading,
    isRefetching,
    error,
    isError,
  } = useGetApi<ApiResponse<ActivityType[]>>({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.LIST}`,
    queryKey: ACTIVITY_KEYS.activityTypeList(),
  });
  useToastError(isError, error);
  const activityData = activityTypeData?.data ?? [];

  const { mutateAsync: createMutate } = usePostApi({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.CREATE}`,
    queryKey: ACTIVITY_KEYS.createActivityType(),
  });

  const { mutateAsync: editMutate } = usePatchApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.EDIT(editingId ?? "")}`,
    queryKey: ACTIVITY_KEYS.editActivity(editingId ?? ""),
  });

  const { mutateAsync: removeMutate } = useDeleteApi<any, any, any>(
    `${URL}${API_ENDPOINTS.ACTIVITIES.REMOVE(removingId ?? "")}`,
    ACTIVITY_KEYS.removeActivity(removingId ?? ""),
  );

  const handleEdit = (item: ActivityType) => {
    setEditingId(item.id);
    setValue("activityName", item.activityName);
    setValue("color", item.color);
  };

  const handleDelete = (item: ActivityType) => {
    setRemovingId(item.id);
    setIsOpenRemoveModal(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const onSubmitCreate = async (data: ActivityTypeFormProps): Promise<void> => {
    try {
      const bodyData = {
        ...data,
        type: stringToCamelCaseString(data.activityName),
      };

      if (editingId) {
        await editMutate({ bodyData });
        toast.success("Zaktualizowano pomyślnie");
      } else {
        await createMutate({ bodyData });
        toast.success("Dodano nowy typ aktywności!");
      }

      await refetch?.();
      handleCancelEdit();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
  };

  const onSubmitDelete = async (): Promise<void> => {
    try {
      await removeMutate({});
      await refetch?.();
      setIsOpenRemoveModal(false);
      setRemovingId(null);
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    }
  };

  return {
    form,
    getList: {
      data: activityData,
      refetch,
      isLoading,
      isRefetching,
      error,
      isError,
    },
    handleEdit,
    handleDelete,
    handleCancelEdit,
    onSubmitCreate,
    onSubmitDelete,
    editingId,
    isOpenRemoveModal,
    setEditingId,
    setIsOpenRemoveModal,
    setRemovingId,
  };
};
