export type TCalendarData = {
  [key: string]: TYear[];
};

export type TYear = {
  [key: string]: TMonth[] | undefined;
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
  disabled: boolean;
  disabledClass: any;
};
