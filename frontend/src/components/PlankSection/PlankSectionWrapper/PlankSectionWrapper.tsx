import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import {
  PlankSectionContextType,
  PlankSectionWrapperProps,
  PlankTrainingObjectData,
} from "../../../types";
import { z } from "zod";

export const plankFormSchema = z.object({
  month: z.string().min(1, "Wybierz miesiąc"),
  day: z.string().min(1, "Wybierz dzień"),
  duration: z.object({
    hour: z.string().regex(/^\d{0,2}$/),
    minutes: z.string().regex(/^\d{0,2}$/),
    seconds: z.string().regex(/^\d{0,2}$/),
  }),
  // Kluczowy moment: transformacja stringa z radio na boolean
  isDifferentExercises: z
    .string()
    .refine((val) => val === "differentYes" || val === "differentNo", {
      message: "Wybierz poprawną opcję",
    })
    .transform((val) => val === "differentYes"), // "differentYes" zamieni się w true, a "differentNo" w false
});

export type PlankFormValues = z.infer<typeof plankFormSchema>;

const defaultFormValues: PlankFormValues = {
  month: "",
  day: "",
  duration: {
    hour: "",
    minutes: "",
    seconds: "",
  },
  isDifferentExercises: false,
};

const PlankSectionWrapper = ({ children }: PlankSectionWrapperProps) => {
  const [toggleOpenFormPanelTraining, setToggleOpenFormPanelTraining] =
    useState(true);
  const [objectData, setObjectData] =
    useState<PlankTrainingObjectData>(undefined);

  const form = useForm<PlankFormValues>({
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
