import React from "react";
import FormInput from "../shared/FormInput/FormInput";
import { HexColorPicker } from "react-colorful";
import { FormProvider, useForm } from "react-hook-form";
import useGetApi from "../../hooks/api/get/useApiGet";
import { StyledColorRectangle } from "./style";
import { URL } from "../../constants";
import ActivityTypeList, {
  TrainingTypeList,
} from "./ActivityTypeList/TrainingTypeList";
import usePostApi from "../../hooks/api/post/useApiPost";
import toast from "react-hot-toast";
import { hexToRgba, stringToCamelCaseString } from "../../utils";
import { useToastError } from "../../hooks/useToastError/useToastError";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver/useYupValidationResolver";
import { activitySchema } from "./schemas";

interface ActivityTypeFormProps {
  activityName: string;
  color: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
}

const ActivityType = () => {
  const [editingId, setEditingId] = React.useState<string | null>(null);

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

  const link = "api/training-type/list";
  const {
    data: activityTypeData,
    refetch,
    status,
    isRefetching,
    error,
    isError,
  } = useGetApi<ApiResponse<TrainingTypeList[]>>({
    link: `${URL}${link}`,
    queryKey: ["trainingTypeList"],
  });
  useToastError(isError, error, "test message");
  const activityData = activityTypeData?.data ?? [];

  const linkCreate = "api/trainingw-type/cre1ate";
  const { mutateAsync } = usePostApi({
    link: `${URL}${linkCreate}`,
    queryKey: ["createTrainingTypeList"],
  });

  const onSubmit = async (data: ActivityTypeFormProps) => {
    try {
      const { activityName } = data;

      const bodyData = {
        ...data,
        type: stringToCamelCaseString(activityName),
      };

      if (editingId) {
        //await mutateUpdate({ id: editingId, bodyData });
        toast.success("Zaktualizowano pomyślnie");
      } else {
        await mutateAsync({ bodyData });
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

  const handleEdit = (item: TrainingTypeList) => {
    setEditingId(item._id);
    setValue("activityName", item.trainingName);
    setValue("color", item.color);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
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
              onChange={(newColor) => setValue("color", newColor)}
            />
            {errors.color && (
              <span className="text-red-500 text-xs mt-2 font-medium">
                {errors.color.message}
              </span>
            )}
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
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95" // Kolor dla edycji
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95" // Twój kolor dla dodawania
                  : "bg-gray-300 cursor-not-allowed text-gray-100 shadow-none" // Stan wyłączony (neutralny)
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
        dataTrainingType={activityData}
        status={status}
        isRefetching={isRefetching}
        onEdit={handleEdit}
      />
    </>
  );
};

export default ActivityType;
