import React, { useState } from "react";
import FormInput from "../shared/FormInput/FormInput";
import { HexColorPicker } from "react-colorful";
import { FormProvider, useForm } from "react-hook-form";
import useGetApi from "../../hooks/api/get/useApiGet";
import TrainingTypeList from "./TrainingTypeList/TrainingTypeList";
import usePostApi from "../../hooks/api/post/useApiPost";
import { StyledColorRectangle } from "./style";

const URL = "http://localhost:5001/";

const TrainingsType = () => {
  const [color, setColor] = useState<string>("");

  const form = useForm<any>({
    defaultValues: {
      trainingName: "",
      color: "",
    },
  });

  const { handleSubmit, register, setValue, reset } = form;

  const link = "api/training-type/list";
  const linkCreate = "api/training-type/create";
  const {
    data: dataTrainingType,
    refetch,
    status,
    isRefetching,
  } = useGetApi(`${URL}${link}`, ["trainingTypeList"], undefined);

  const { mutation } = usePostApi(
    `${URL}${linkCreate}`,
    ["createTrainingTypeList"],
    null,
  );

  const onSubmit = handleSubmit((data: any) => {
    mutation.mutate({ paramsObj: null, bodyData: data });

    setTimeout(async () => {
      reset();
      setColor("");
      await refetch?.();
    }, 500);
  });

  const hexToRgba = (hex: string, alpha = 1): string => {
    const [r, g, b] = hex
      .match(/\w\w/g)!
      .map((val: string) => parseInt(val, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Dodaj typ treningu:
      </h2>
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <FormInput<any>
            id="trainingName"
            // @ts-ignore
            type="text"
            name="trainingName"
            label="Typ treningu"
            className="mb-2 w-2/5"
            errors={{}}
            rules={{}}
          />
          <div className="flex">
            <HexColorPicker
              color={color}
              onChange={(color) => {
                setValue("color", color);
                setColor(color);
              }}
            />
            {color ? (
              <div className=" flex flex-col ml-3">
                <StyledColorRectangle color={color}></StyledColorRectangle>
                <div>
                  Hex wybranego koloru to{" "}
                  <span className="font-bold">{color}</span>
                </div>
                <div>
                  Rgba wybranego koloru to{" "}
                  <span className="font-bold">{hexToRgba(color)}</span>
                </div>
              </div>
            ) : null}
          </div>
          <button
            className=" mt-3 focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            type="submit"
          >
            Dodaj
          </button>
        </form>
      </FormProvider>
      <TrainingTypeList
        dataTrainingType={dataTrainingType}
        status={status}
        isRefetching={isRefetching}
      />
    </>
  );
};

export default TrainingsType;
