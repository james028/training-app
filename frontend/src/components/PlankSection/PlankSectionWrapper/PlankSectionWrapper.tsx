import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import {
  PlankFormData,
  PlankSectionContextType,
  PlankSectionWrapperProps,
  PlankTrainingObjectData,
} from "../../../types";

const defaultFormValues: PlankFormData = {
  month: "",
  day: "",
  duration: {
    hour: "",
    minutes: "",
    seconds: "",
  },
  isDifferentExercises: "",
};

const PlankSectionWrapper = ({ children }: PlankSectionWrapperProps) => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(true);
  const [objectData, setObjectData] =
    useState<PlankTrainingObjectData>(undefined);

  const form = useForm<PlankFormData>({
    defaultValues: defaultFormValues,
    // Opcjonalnie: dodaj 'resolver' (np. z Yup/Zod) dla walidacji schematu
  });

  // 3. Obiekt kontekstu (typ PlankSectionContextType)
  const contextValue: PlankSectionContextType = {
    toggleOpenFormPanelTraining,
    setToggleOpenFormPanelTraining,
    objectData,
    setObjectData,
  };

  return (
    <PlankSectionContext.Provider value={contextValue}>
      <FormProvider {...form}>{children}</FormProvider>
    </PlankSectionContext.Provider>
  );
};

export default PlankSectionWrapper;
