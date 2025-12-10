import React from "react";
import { date } from "yup";

export type TCalendarData = {
  [key: string]: TYear[];
};

export type TYear = {
  [key: string]: TMonth[];
};

export type TMonth = {
  [key: string]: TDay[];
};

//tu lepsze otypowanie
export type TDay = {
  //dokladnie dobrze zrobic czy string czy number
  id: number;
  type: string;
  bikeType: string;
  bikeKilometers: number;
  duration: string; // potem jakis moze data
  fullDateTime: string;
};

export type TPlankData = {
  [key: string]: TPlankMonthData[];
};

export type TPlankMonthData = {
  [key: string]: TPlankDayData;
};

export type TPlankDayData = {
  day: string;
  duration: string;
  month: string;
  _id?: string;
};

export type TButtons = {
  key: number;
  handleChangeMonth: () => void;
  svg: JSX.Element;
  border: JSX.Element | null;
  disabled: any;
  //disabledClass: any;
};

export type MonthIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthName =
  | "Styczeń"
  | "Luty"
  | "Marzec"
  | "Kwiecień"
  | "Maj"
  | "Czerwiec"
  | "Lipiec"
  | "Sierpień"
  | "Wrzesień"
  | "Październik"
  | "Listopad"
  | "Grudzień";

export type MonthObjectMap = Record<MonthIndex, MonthName>;
export type ConvertedMonthObjectMap = Record<MonthIndex, MonthNameLower>;
export type MonthNameLower = Lowercase<MonthName>;
export type MonthDaysMap = Record<MonthNameLower, number>;

export interface Duration {
  hour: string;
  minutes: string;
  seconds: string;
}

export interface PlankFormData {
  month: string;
  day: string;
  duration: Duration;
  // Zmieniamy typ na 'boolean', co jest typowe dla checkboxów/przełączników.
  //to radiobox i dowiedzieć sie o nazewnictwo
  isDifferentExercises: string;

  //tutaj ogarnąć
  // Opcjonalne pole 'id' na wypadek edycji istniejącego wpisu.
  _id?: string;
}

/** Typ dla danych przechowywanych w 'objectData' - może to być PlankFormData lub undefined. */
export type PlankTrainingObjectData = PlankFormData | undefined;

export interface PlankSectionContextType {
  toggleOpenFormPanelTraining: boolean;
  setToggleOpenFormPanelTraining: React.Dispatch<React.SetStateAction<boolean>>;
  objectData: PlankTrainingObjectData;
  setObjectData: React.Dispatch<React.SetStateAction<PlankTrainingObjectData>>;
}

export type DailyTasksMap = {
  [dateKey: string]: TDay[];
};
