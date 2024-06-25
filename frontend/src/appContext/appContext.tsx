import { createContext, useContext } from "react";

export type AppContextProps = {
  url: string;
};

export const AppContext = createContext<any>({
  url: "",
});
export const useAppContext = () => useContext(AppContext);
