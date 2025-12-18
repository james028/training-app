import { useState, useEffect } from "react";

export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
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

  const removeValue = () => {
    window.localStorage.removeItem(key);
  };

  return [value, setValue, removeValue];
}
