import { useEffect } from "react";
import { AuthResponse } from "../../appContext/appContext";

export const useSyncStorage = (
  setAuth: (user: AuthResponse | null) => void,
  removeValue: () => void,
) => {
  useEffect(() => {
    if (!setAuth || typeof setAuth !== "function") {
      console.error("useSyncStorage: addUser nie jest funkcją!", setAuth);
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "jwt" && !event.newValue) {
        removeValue();
        setAuth(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setAuth, removeValue]);
};
