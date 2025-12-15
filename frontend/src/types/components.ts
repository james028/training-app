import { ReactNode } from "react";
import { TDay, TDay2, TrainingTypeColor } from "./types";
import { FlattenedTask } from "../components/Calendar/Calendar";

export type RemovePlankTrainingProps = {
  closeModal: () => void;
};

export interface PlankSectionWrapperProps {
  children: ReactNode;
}

export interface CalendarDaysProps {
  calendarData: FlattenedTask[];
  year: number;
  month: number;
}

export interface TCalendarDay {
  data: TDay[];
  day: string | null;
  isEmpty: boolean;
  trainingDataColor: TrainingTypeColor[];
}
