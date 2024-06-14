import { createContext, useContext } from "react";

export type PlankSectionContextProps = {
  toggleOpenFormPanelTraining: boolean;
  //zmienic
  setToggleOpenFormPanelTraining: any;
};
export const PlankSectionContext = createContext<PlankSectionContextProps>({
  toggleOpenFormPanelTraining: false, // set a default value
  setToggleOpenFormPanelTraining: () => {},
});
export const usePlankSectionContext = () => useContext(PlankSectionContext);
