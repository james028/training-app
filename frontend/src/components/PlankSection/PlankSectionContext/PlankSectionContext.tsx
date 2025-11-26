import { createContext, useContext } from "react";
import { PlankSectionContextType } from "../../../types";

export const PlankSectionContext = createContext<PlankSectionContextType>({
  toggleOpenFormPanelTraining: false, // set a default value
  setToggleOpenFormPanelTraining: () => {},
  objectData: undefined,
  setObjectData: () => {},
});
export const usePlankSectionContext = () => useContext(PlankSectionContext);
