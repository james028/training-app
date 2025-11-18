import { createContext, useContext, useMemo, useState } from "react";
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
  const [linkUrl, setLinkUrl] = useState<string>("");

  const addUser = (user: Record<string, any>) => {
    setUser(user);
  };

  console.log(user, "user");

  const value = useMemo(
    () => ({
      user,
      addUser,
      monthIndex,
      setMonthIndex,
      linkUrl,
      setLinkUrl,
    }),
    [user, monthIndex, linkUrl],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default ContextProvider;
