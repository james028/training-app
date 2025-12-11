import { useEffect, useRef } from "react";
import toast, { ToastOptions } from "react-hot-toast";

export const useToastError = (
  isError: boolean,
  error: unknown,
  message?: string,
  errorProps?: ToastOptions,
) => {
  const errorShownRef = useRef(false);

  useEffect(() => {
    if (isError && error && !errorShownRef.current) {
      errorShownRef.current = true;

      const errorMessage =
        error instanceof Error ? error.message : message ?? "An error occurred";

      toast.error(errorMessage, {
        id: `error-${Date.now()}`,
        ...errorProps,
      });
    }

    if (!isError) {
      errorShownRef.current = false;
    }
  }, [isError, error, message, errorProps]);
};
