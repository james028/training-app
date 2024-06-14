import React, { useState } from "react";
import PlankMonthList from "./PlankMonthList/PlankMonthList";
import AddEditPlankTraining from "./AddEditPlankTraining/AddEditPlankTraining";
import { PlankSectionContext } from "./PlankSectionContext/PlankSectionContext";
import { FormProvider, useForm } from "react-hook-form";

const PlankSection = () => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(false);

  const form = useForm<any>({
    defaultValues: {
      month: "",
      day: "",
      duration: {
        hour: "",
        minutes: "",
        seconds: "",
      },
      isDifferentExercises: "",
    },
  });
  const { getValues } = form;

  console.log(getValues("day"), "val");
  console.log(getValues("month"), "val2");

  return (
    <div>
      Plank Section
      <PlankSectionContext.Provider
        value={{ toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining }}
      >
        <FormProvider {...form}>
          <AddEditPlankTraining />
          <PlankMonthList />
        </FormProvider>
      </PlankSectionContext.Provider>
    </div>
  );
};

export default PlankSection;
