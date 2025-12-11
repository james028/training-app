import { ReactNode } from "react";
import { TDay, TrainingTypeColor } from "./types";

export type RemovePlankTrainingProps = {
  closeModal: () => void;
};

export interface PlankSectionWrapperProps {
  children: ReactNode;
}

export interface CalendarDaysProps {
  calendarData: TDay[];
  year: number;
  month: number;
}

export interface TCalendarDay {
  data: TDay[];
  day: string | null;
  isEmpty: boolean;
  trainingDataColor: TrainingTypeColor[];
}
