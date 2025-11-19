import React, { useState } from "react";
import PlankMonthList from "./PlankMonthList/PlankMonthList";
import AddEditPlankTraining from "./AddEditPlankTraining/AddEditPlankTraining";
import { PlankSectionContext } from "./PlankSectionContext/PlankSectionContext";
import { FormProvider, useForm } from "react-hook-form";

const PlankSection = () => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(true);
  const [objectData, setObjectData] = React.useState();

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

  return (
    <div>
      Plank Section
      <PlankSectionContext.Provider
        value={{
          toggleOpenFormPanelTraining,
          setToggleOpenFormPanelTraining,
          objectData,
          setObjectData,
        }}
      >
        <FormProvider {...form}>
          <AddEditPlankTraining />
          {/*<PlankMonthList />*/}
        </FormProvider>
      </PlankSectionContext.Provider>
    </div>
  );
};

export default PlankSection;
