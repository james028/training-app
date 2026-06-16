import { createContext, useContext } from "react";
import { PlankSectionContextType } from "../../../types";

export const PlankSectionContext = createContext<PlankSectionContextType>({
  toggleOpenFormPanelTraining: false,
  setToggleOpenFormPanelTraining: () => {},
  objectData: undefined,
  setObjectData: () => {},
});
export const usePlankSectionContext = () => useContext(PlankSectionContext);
