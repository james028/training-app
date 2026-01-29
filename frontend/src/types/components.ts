import { ReactNode } from "react";
import { ActivityType, TDay } from "./types";
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
  activityData: ActivityType[];
}

export interface ActivityTypeListProps {
  dataActivityType: ActivityType[];
  isLoading: boolean;
  isError: boolean;
  //isRefetching: boolean;
  onEdit: (item: ActivityType) => void;
  onDelete: (item: ActivityType) => void;
}

export interface TableCellProps {
  columnKey: keyof ActivityType | string;
  value: string | number | boolean | null | undefined;
  row: ActivityType;
  onEdit: (item: ActivityType) => void;
  onDelete: (item: ActivityType) => void;
}
