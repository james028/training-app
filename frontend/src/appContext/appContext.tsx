import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage/useLocalStorage";
import { DateTime } from "luxon";

export type AppContextProps = {
  url: string;
  user: Record<string, any>;
  setUser: (user: Record<string, any> | null) => void;
};

//otypować
const AppContext = createContext<any>({
  url: "",
  user: {},
  setUser: () => {},
});
//export const useAppContext = () => useContext(AppContext);

//export const Context = createContext();

//otypować
const ContextProvider = (props: any) => {
  const [monthIndex, setMonthIndex] = useState(() => {
    const currentDate = DateTime.now();
    const { month } = currentDate.toObject();

    //return month;

    return 2;
  });

  const [user, setUser] = useLocalStorage("jwt");

  const addUser = (user: Record<string, any>) => {
    setUser(user);
  };

  return (
    <AppContext.Provider value={{ user, addUser, monthIndex, setMonthIndex }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default ContextProvider;
