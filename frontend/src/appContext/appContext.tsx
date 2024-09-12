import { createContext, useContext } from "react";

export type AppContextProps = {
  url: string;
  user: Record<string, any>;
  setUser: () => void;
};

export const AppContext = createContext<any>({
  url: "",
  user: {},
  setUser: () => null,
});
export const useAppContext = () => useContext(AppContext);
