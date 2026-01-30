import { useToastError } from "../../../hooks/useToastError/useToastError";
import { useState } from "react";
import { stringToCamelCaseString } from "../../../utils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { activitySchema } from "../schemas";
import { ActivityType } from "../../../types";
import {
  useActivityTypes,
  useCreateActivityType,
  useDeleteActivityType,
  useUpdateActivityType,
} from "../../../hooks/useActivity";

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
    isLoading,
    error,
    isError,
  } = useActivityTypes();
  useToastError(isError, error);
  const activityData = activityTypeData?.data ?? [];

  const { mutateAsync: createMutate } = useCreateActivityType();
  const {
    mutateAsync: editMutate,
    //isPending
  } = useUpdateActivityType(editingId ?? "");
  const { mutateAsync: removeMutate } = useDeleteActivityType(removingId ?? "");

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
      isLoading,
      //isRefetching,
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
