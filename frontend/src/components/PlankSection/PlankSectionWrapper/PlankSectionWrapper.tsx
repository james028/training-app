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
  duration: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, "Niepoprawny format czasu")
    .refine((value) => value !== "00:00:00", {
      message: "Podaj czas treningu.",
    }),
  isDifferentExercises: z.boolean(),
});

export type PlankFormInput = z.infer<typeof plankFormSchema>;

const PlankSectionWrapper = ({ children }: PlankSectionWrapperProps) => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(true);
  const [objectData, setObjectData] = useState<PlankTrainingObjectData>({
    mode: null,
    data: null,
  });

  const form = useForm<PlankFormInput>({
    resolver: zodResolver(plankFormSchema),
    defaultValues: {
      month: "",
      day: "",
      duration: "00:00:00",
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
