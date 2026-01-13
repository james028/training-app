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
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver/useYupValidationResolver";

interface ActivityTypeFormProps {
  activityName: string;
  color: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
}

export const activitySchema = yup
  .object({
    activityName: yup
      .string()
      .required("Nazwa treningu jest wymagana")
      .min(3, "Nazwa musi mieć przynajmniej 3 znaki")
      .max(50, "Nazwa jest za długa"),

    color: yup
      .string()
      .required("Musisz wybrać kolor")
      // Opcjonalnie: regex sprawdzający poprawność formatu HEX
      .matches(/^#[0-9A-F]{6}$/i, "Niepoprawny format koloru"),
  })
  .required();

const ActivityType = () => {
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
    error: geterr,
    isError: getError,
  } = useGetApi<ApiResponse<TrainingTypeList[]>>({
    link: `${URL}${link}`,
    queryKey: ["trainingTypeList"],
  });
  useToastError(getError, geterr, "test message");
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
      await mutateAsync({ bodyData });

      toast.success("Dodano nowy typ aktywności!");
      reset();
      await refetch?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
  };

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
            disabled={!isValid || isSubmitting}
            className={`
    mt-3 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 transition-all
    ${
      isValid
        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95"
        : "bg-orange-300 cursor-not-allowed text-orange-100 shadow-none"
    }
  `}
            type="submit"
          >
            {isSubmitting ? "Dodawanie..." : "Dodaj"}
          </button>
        </form>
      </FormProvider>

      <ActivityTypeList
        dataTrainingType={activityData}
        status={status}
        isRefetching={isRefetching}
      />
    </>
  );
};

export default ActivityType;
