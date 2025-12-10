import { ReactNode } from "react";
import { TDay } from "./types";

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
