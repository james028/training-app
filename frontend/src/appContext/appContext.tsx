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
  const getCurrentYearAndMonth = (): { year: number; month: number } => {
    const now = DateTime.local();

    return {
      year: now.year, // np. 2025
      month: now.month, // np. 12 (Grudzień)
    };
  };

  const { year: initialYear, month: initialMonth } = getCurrentYearAndMonth();
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  // const [monthIndex, setMonthIndex] = useState(() => {
  //   const currentDate = DateTime.now();
  //   const { month } = currentDate.toObject();
  //
  //   return month;
  // });

  const changeMonth = (offset: number) => {
    // Tworzymy datę Luxon z aktualnie wybranego stanu
    console.log(offset);
    const current = DateTime.local(selectedYear, selectedMonth, 1);

    // Dodajemy lub odejmujemy miesiące
    const nextDate = current.plus({ months: offset });

    console.log(nextDate.month, "next");

    setSelectedYear(nextDate.year);
    setSelectedMonth(nextDate.month);
  };
  const [user, setUser] = useLocalStorage("jwt");
  const [linkUrl, setLinkUrl] = useState<string>("");

  const addUser = (user: Record<string, any>) => {
    setUser(user);
  };

  //console.log(user, "user");

  const value =
    //useMemo(
    //()
    //=>
    //(
    {
      user,
      addUser,
      year: selectedYear,
      month: selectedMonth,
      linkUrl,
      setLinkUrl,
      changeMonth,
    };
  //);
  //[user, linkUrl],
  // /);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default ContextProvider;
