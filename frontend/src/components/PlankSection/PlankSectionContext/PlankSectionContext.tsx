import { createContext, useContext } from "react";

export type PlankSectionContextProps = {
  toggleOpenFormPanelTraining: boolean;
  //zmienic
  setToggleOpenFormPanelTraining: any;
  objectData: any;
  setObjectData: any;
};
export const PlankSectionContext = createContext<PlankSectionContextProps>({
  toggleOpenFormPanelTraining: false, // set a default value
  setToggleOpenFormPanelTraining: () => {},
  objectData: {},
  setObjectData: () => {},
});
export const usePlankSectionContext = () => useContext(PlankSectionContext);
