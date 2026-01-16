import React, { useState } from "react";
import FormInput from "../shared/FormInput/FormInput";
import { HexColorPicker } from "react-colorful";
import { FormProvider, useForm } from "react-hook-form";
import useGetApi from "../../hooks/api/get/useApiGet";
import { StyledColorRectangle } from "./style";
import { API_ENDPOINTS, MONTH_NAMES_MAP, URL } from "../../constants";
import ActivityTypeList, {
  ActivityType,
} from "./ActivityTypeList/ActivityTypeList";
import usePostApi from "../../hooks/api/post/useApiPost";
import toast from "react-hot-toast";
import { hexToRgba, stringToCamelCaseString } from "../../utils";
import { useToastError } from "../../hooks/useToastError/useToastError";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver/useYupValidationResolver";
import { activitySchema } from "./schemas";
import usePatchApi from "../../hooks/api/patch/useApiPatch";
import Modal from "../shared/Modal/Modal";
import SubmitButtons from "../Forms/SubmitButtons/SubmitButtons";
import useDeleteApi from "../../hooks/api/delete/useApiDelete";

interface ActivityTypeFormProps {
  activityName: string;
  color: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
}

const ActivityTypePage = () => {
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

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = form;
  const currentColor = watch("color");

  const {
    data: activityTypeData,
    refetch,
    isLoading,
    isRefetching,
    error,
    isError,
  } = useGetApi<ApiResponse<ActivityType[]>>({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.LIST}`,
    queryKey: ["activityTypeList"],
  });
  useToastError(isError, error);

  const activityData = activityTypeData?.data ?? [];

  const { mutateAsync: mutateAsyncCreate } = usePostApi({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.CREATE}`,
    queryKey: ["createActivityTypeList"],
  });

  const editId = editingId ?? "";
  const { mutateAsync: mutateAsyncEdit } = usePatchApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.ACTIVITIES.EDIT(editId)}`,
    queryKey: ["editActivityTypeList"],
  });

  const removeId = removingId ?? "";
  const { mutateAsync: mutateAsyncRemove } = useDeleteApi<any, any, any>(
    `${URL}${API_ENDPOINTS.ACTIVITIES.REMOVE(removeId)}`,
    ["removeActivityTypeList"],
  );

  const onSubmit = async (data: ActivityTypeFormProps): Promise<void> => {
    try {
      const { activityName } = data;

      const bodyData = {
        ...data,
        type: stringToCamelCaseString(activityName),
      };

      if (editingId) {
        await mutateAsyncEdit({ bodyData });
        toast.success("Zaktualizowano pomyślnie");
      } else {
        await mutateAsyncCreate({ bodyData });
        toast.success("Dodano nowy typ aktywności!");
      }

      handleCancelEdit();
      await refetch?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
  };

  const onSubmitDelete = async (): Promise<void> => {
    try {
      await mutateAsyncRemove({});
      await refetch?.();
      setIsOpenRemoveModal(false);
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    }
  };

  const handleEdit = (item: ActivityType) => {
    setEditingId(item.id);
    setValue("activityName", item.activityName);
    setValue("color", item.color);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const handleDelete = (item: ActivityType) => {
    setIsOpenRemoveModal(true);
    setRemovingId(item.id);
  };

  const isEditing = Boolean(editingId);
  const isBtnDisabled = !isValid || isSubmitting;
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Dodaj typ treningu:
      </h2>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput<any>
            id="activityName"
            name="activityName"
            label="Typ treningu"
            className="mb-2 w-2/5"
            errors={errors}
          />
          <div className="flex">
            <HexColorPicker
              color={currentColor}
              onChange={(newColor) =>
                setValue("color", newColor, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            {currentColor ? (
              <div className=" flex flex-col ml-3">
                <StyledColorRectangle
                  color={currentColor}
                ></StyledColorRectangle>
                <div>
                  Hex wybranego koloru to{" "}
                  <span className="font-bold">{currentColor}</span>
                </div>
                <div>
                  Rgba wybranego koloru to{" "}
                  <span className="font-bold">{hexToRgba(currentColor)}</span>
                </div>
              </div>
            ) : null}
          </div>
          <button
            disabled={isBtnDisabled}
            className={`
              mt-3 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 transition-all
              ${
                !isBtnDisabled
                  ? isEditing
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95"
                  : "bg-gray-300 cursor-not-allowed text-gray-100 shadow-none"
              }
            `}
            type="submit"
          >
            {isSubmitting
              ? isEditing
                ? "Zapisywanie..."
                : "Dodawanie..."
              : isEditing
                ? "Zapisz zmiany"
                : "Dodaj typ"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-sm"
            >
              Anuluj
            </button>
          )}
        </form>
      </FormProvider>

      <ActivityTypeList
        dataActivityType={activityData}
        isLoading={isLoading}
        isError={isError}
        isRefetching={isRefetching}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isOpenRemoveModal ? (
        <Modal
          openModal={() => setIsOpenRemoveModal(true)}
          closeModal={() => setIsOpenRemoveModal(false)}
          modalTitle={"Usuwanie aktywności"}
        >
          <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
            <div className="text-base text-neutral-600 dark:text-neutral-200 cursor-default">
              Czy napewno chcesz usunąć aktywność?
            </div>
          </div>
          <SubmitButtons
            closeModal={() => setIsOpenRemoveModal(false)}
            saveChanges={() => onSubmitDelete()}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default ActivityTypePage;
