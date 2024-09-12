import { useEffect, useState } from "react";

export function useLocalStorage2(key: string) {
  const [value, setValue] = useState(
    // () => {
    //   try {
    //     const storedValue = window.localStorage.getItem(key);
    //     return storedValue && storedValue !== undefined
    //       ? JSON.parse(storedValue)
    //       : undefined;
    //   } catch (error) {
    //     console.error(error);
    //     return undefined;
    //   }
    // },

    () => {
      const localStorageValue = window.localStorage.getItem(key);
      if (localStorageValue && localStorageValue !== "undefined") {
        return JSON.parse(localStorageValue);
      }
      //   //return typeof intialValue === 'function' ? intialValue() : intialValue
    },
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

export const XXX = (key: string) => {
  // useEffect(() => {
  //   window.localStorage.setItem(key, JSON.stringify(value));
  // }, [value]);

  const useSetItem = (value: unknown) => {
    console.log(value, " w jwe");

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log(value, " w jwe22");
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);

      // @ts-ignore
      //console.log(JSON.parse(item));
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { useSetItem, getItem, removeItem };
};
