import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage/useLocalStorage";
import { DateTime } from "luxon";
import { useSyncStorage } from "../hooks/useSyncStorage/useSyncStorage";

// interface AppContextType {
//   //url: string;
//   //user: Record<string, any>;
//   //setUser: (user: Record<string, any> | null) => void;
//   user: any;
//   addUser: any;
//   year: any;
//   month: any;
//   changeMonth: any;
// }

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse extends User {
  accessToken: string;
}

//otypować
const AppContext = createContext<any | undefined>(undefined);

//otypować
const ContextProvider = ({ children }: { children: any }) => {
  const getCurrentYearAndMonth = (): { year: number; month: number } => {
    const now = DateTime.local();
    const { year, month } = now;

    return {
      year,
      month,
    };
  };

  const { year: initialYear, month: initialMonth } = getCurrentYearAndMonth();
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const changeMonth = useCallback(
    (offset: number) => {
      const current = DateTime.local(selectedYear, selectedMonth, 1);

      // Dodajemy lub odejmujemy miesiące
      const nextDate = current.plus({ months: offset });

      setSelectedYear(nextDate.year);
      setSelectedMonth(nextDate.month);
    },
    [selectedMonth, selectedYear],
  );

  const [auth, setAuth, removeAuth] = useLocalStorage("jwt");

  const handleChangeAuth = useCallback(
    (user: any | null) => {
      //tu poprawić to any, otypować poprawnie
      console.log(user, "user!");
      //const { message, ...userData } = user;
      setAuth(user);
    },
    [setAuth],
  );
  useSyncStorage(handleChangeAuth, removeAuth);

  const value = useMemo(() => {
    return {
      auth,
      handleChangeAuth,
      year: selectedYear,
      month: selectedMonth,
      changeMonth,
    };
  }, [auth, selectedYear, selectedMonth, changeMonth, handleChangeAuth]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default ContextProvider;
