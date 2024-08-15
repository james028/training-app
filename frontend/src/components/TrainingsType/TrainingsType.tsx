import React, { useState } from "react";
import FormInput from "../shared/FormInput/FormInput";
import { HexColorPicker } from "react-colorful";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrationFormFields } from "../Forms/EditTrainingForm/EditTrainingForm";
import useGetApi from "../../hooks/api/get/useApiGet";
import { AppContext } from "../../appContext/appContext";
import TrainingTypeList from "./TrainingTypeList/TrainingTypeList";
import usePostApi from "../../hooks/api/post/useApiPost";

const data = [
  { id: "1", name: "Siłownia", color: "#6a215e" },
  { id: "1", name: "Sauna", color: "#78d258" },
  { id: "1", name: "Airbike", color: "#3a3f56" },
  { id: "1", name: "Cardio-las", color: "#cd8f67" },
];

const URL = "http://localhost:5001/";

const TrainingsType = () => {
  const [color, setColor] = useState<string>("");

  const form = useForm<any>({
    defaultValues: {
      trainingName: "",
      color: "",
    },
  });

  const { handleSubmit, register, setValue } = form;

  const link = "api/training-type/list";
  const linkCreate = "api/training-type/create";
  const { data: dataTrainingType, refetch } = useGetApi(
    `${URL}${link}`,
    ["trainingTypeList"],
    undefined,
  );

  const { mutate } = usePostApi(
    `${URL}${linkCreate}`,
    ["createTrainingTypeList"],
    null,
  );

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);

    mutate({ paramsObj: null, bodyData: data });
    setTimeout(async () => {
      await refetch?.();
    }, 500);
    //closeModal();
  });

  const hexToRgba = (hex: string, alpha = 1): string => {
    //if (hex && hex.match(/\w\w/g).length !== 0) {
    // @ts-ignore
    const [r, g, b] = hex
      .match(/\w\w/g)
      .map((val: string) => parseInt(val, 16));
    return `rgba(${r},${g},${b},${alpha})`;
    //}
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
            className="mb-2"
            errors={{}}
            rules={{}}
          />
          <HexColorPicker
            color={color}
            onChange={(color) => {
              setValue("color", color);
              setColor(color);
            }}
          />
          {color ? (
            <>
              <div
                className="value"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: `${color}`,
                }}
              ></div>
              <div>Hex wybranego koloru to {color}</div>
              <div>Rgba wybranego koloru to {hexToRgba(color)}</div>
            </>
          ) : null}

          <button
            className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            type="submit"
          >
            Dodaj
          </button>
        </form>
      </FormProvider>
      <TrainingTypeList
        dataTrainingType={dataTrainingType?.filter(
          (value: any) => Object.keys(value).length !== 0,
        )}
      />
    </>
  );
};

export default TrainingsType;
