import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import {
  PlankSectionContextType,
  PlankSectionWrapperProps,
  PlankTrainingObjectData,
} from "../../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const plankFormSchema = z.object({
  month: z.string().min(1, "Wybierz miesiąc"),
  day: z.string().min(1, "Wybierz dzień"),
  duration: z.object({
    hour: z.string().regex(/^\d{0,2}$/),
    minutes: z.string().regex(/^\d{0,2}$/),
    seconds: z.string().regex(/^\d{0,2}$/),
  }),
  isDifferentExercises: z.boolean(),
});
export type PlankFormInput = z.infer<typeof plankFormSchema>;

const PlankSectionWrapper = ({ children }: PlankSectionWrapperProps) => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(true);
  const [objectData, setObjectData] =
    useState<PlankTrainingObjectData>(undefined);

  const form = useForm<PlankFormInput>({
    resolver: zodResolver(plankFormSchema),
    defaultValues: {
      month: "",
      day: "",
      duration: { hour: "00", minutes: "00", seconds: "00" },
      isDifferentExercises: false,
    },
  });

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
