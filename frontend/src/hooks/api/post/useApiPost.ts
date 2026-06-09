import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { useState } from "react";
import toast from "react-hot-toast";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
type StatusProps = "loading" | "success" | "error";

interface ApiErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

// Zmień interfejs na generyczny i dodaj TParams
interface MutationVariables<
  TBody = Record<string, any>,
  TParams = Record<string, any>,
> {
  // Zostawiamy pola opcjonalne, aby obsłużyć mutacje bez body
  bodyData?: TBody | null;

  // Poprawiamy typ do TParams
  paramsObject?: TParams | null;
  customLink?: string;
  // Metadane
  successMessage?: string;
  errorMessage?: string;
}

const useSetResponseStatus = (): {
  responseStatus: Status;
  setLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
} => {
  const [status, setStatus] = useState<StatusProps>();

  const responseStatusObject = {
    loading: Status.LOADING,
    success: Status.SUCCESS,
    error: Status.ERROR,
  };

  let responseStatus: Status =
    responseStatusObject[
      status as unknown as keyof typeof responseStatusObject
    ];

  const setLoading = () => {
    setStatus("loading");
  };
  const setSuccess = () => {
    setStatus("success");
  };
  const setError = () => {
    setStatus("error");
  };

  return { responseStatus, setLoading, setSuccess, setError };
};

const usePostApi = <TBody, TData, TParams extends Record<string, any>>({
  link: baseLink,
  params,
  headers,
  invalidateKeys = [],
}: {
  link?: string;
  params?: Record<string, any> | null;
  headers?: RawAxiosRequestHeaders;
  invalidateKeys?: (readonly unknown[])[];
}): {
  mutate: (variables: MutationVariables<TBody, TParams>) => void;
  mutateAsync: (variables: MutationVariables<TBody, TParams>) => Promise<TData>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApiErrorResponse | null;
  data: TData | undefined;
  responseStatus: Status;
} => {
  const queryClient = useQueryClient();

  const { responseStatus, setLoading, setSuccess, setError } =
    useSetResponseStatus();

  const createPost = async ({
    paramsObject,
    bodyData,
    customLink,
  }: MutationVariables<TBody, TParams>): Promise<TData> => {
    setLoading();

    const targetLink = customLink || baseLink || "";

    if (!targetLink) {
      throw new Error("Brak zdefiniowanego linku dla mutacji POST.");
    }

    const result = await axios.post<TData>(
      endpointWithParams(targetLink, params, getParams(paramsObject)),
      bodyData,
      { headers },
    );

    return result.data;
  };

  const { mutate, mutateAsync, isLoading, isError, isSuccess, error, data } =
    useMutation<TData, ApiErrorResponse, MutationVariables<TBody, TParams>>({
      mutationFn: (body) => createPost(body),
      onMutate: () => {
        // Można tu dodać optymistyczną aktualizację
      },
      onSuccess: (data, variables) => {
        setSuccess();

        if (variables?.successMessage) {
          toast.success(variables.successMessage);
        }
        invalidateKeys.forEach((key) =>
          queryClient.invalidateQueries({
            queryKey: key,
            exact: true,
            refetchType: "all",
          }),
        );
      },
      onError: (error, variables) => {
        setError();
        const message =
          variables.errorMessage ||
          error?.response?.data?.message ||
          "Coś poszło nie tak 😢";
        toast.error(message);
      },
    });

  return {
    mutate,
    mutateAsync,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    responseStatus,
  };
};

export default usePostApi;
