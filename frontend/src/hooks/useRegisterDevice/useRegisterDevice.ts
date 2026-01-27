import { useEffect, useRef } from "react";
import { useAppContext } from "../../appContext/appContext";
import usePostApi from "../api/post/useApiPost";
import { API_ENDPOINTS, URL } from "../../constants";
import { CHECKLIST_KEYS, DEVICE_KEYS } from "../../constants/query-keys";
import { useToastError } from "../useToastError/useToastError";

export const useRegisterDevice = (fingerprint?: string) => {
  const hasRegistered = useRef(false);

  const { auth } = useAppContext();
  const userId = auth?.data?.id ?? "";
  const token = auth?.data?.token ?? null;
  const isAuthenticated = Object.keys(auth?.data ?? {}).length > 0;

  const { mutateAsync, isError, error } = usePostApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.REGISTER_DEVICE.CREATE}`,
    queryKey: DEVICE_KEYS.checkListCreate(),
    headers: { Authorization: `Bearer ${token}` },
  });
  useToastError(isError, error);

  console.log({
    isAuthenticated: isAuthenticated,
    "2": !hasRegistered.current,
    fingerprint,
  });

  useEffect(() => {
    if (isAuthenticated && fingerprint && !hasRegistered.current) {
      hasRegistered.current = true;

      console.log("useEffect", fingerprint);

      mutateAsync({
        bodyData: {
          deviceId: fingerprint,
          deviceName: navigator.userAgent.includes("Mobile")
            ? "Mobile"
            : "Desktop",
        },
      });
    }
  }, [isAuthenticated, userId, fingerprint, mutateAsync]);
};

// Jeśli chcesz dopisać „refetch po rejestracji”
//
// Możesz dodać onSuccess w useMutation, np. żeby odświeżyć listę urządzeń:
//
//     import { useQueryClient } from "@tanstack/react-query";
//
// export const useRegisterDevice = () => {
//   const queryClient = useQueryClient();
//
//   return useMutation(registerDevice, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["devices"]);
//     },
//   });
// };
