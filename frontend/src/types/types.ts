export type TCalendarData = {
  [key: string]: TYear[];
};

export type TYear = {
  [key: string]: TMonth[];
};

export type TMonth = {
  [key: string]: TDay[];
};

export type TDay = {
  type: string;
  bikeType: string;
  bikeKilometers: number;
  duration: string; // potem jakis moze data
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
