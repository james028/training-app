import React, { useState, useEffect } from "react";

//zrobic w ts
export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    // try {
    //   const storedValue = window.localStorage.getItem(key);
    //   return storedValue ? JSON.parse(storedValue) : undefined;
    // } catch (error) {
    //   console.error(error);
    //   return undefined;
    // }

    const localStorageValue = window.localStorage.getItem(key);
    if (localStorageValue && localStorageValue !== "undefined") {
      return JSON.parse(localStorageValue);
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);
  return [value, setValue];
}
