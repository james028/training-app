import { QueryClient, QueryKey, useMutation } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { useState } from "react";
import toast from "react-hot-toast";

const queryClient = new QueryClient();

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

const usePostApi = <TData, TBody, TParams extends Record<string, any>>({
  link,
  queryKey,
  params,
  headers,
  invalidateKeys,
}: {
  link: string;
  queryKey: QueryKey;
  params?: Record<string, any> | null | undefined; // Path params (statyczne)
  headers?: RawAxiosRequestHeaders | undefined;
  invalidateKeys?: any;
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
  const { responseStatus, setLoading, setSuccess, setError } =
    useSetResponseStatus();

  const createPost = async (
    // Używamy zdestrukturyzowanego obiektu, który musi być poprawnie otypowany
    { paramsObject, bodyData }: MutationVariables<TBody, TParams>,
  ): Promise<TData> => {
    setLoading();

    const result = await axios.post<TData>(
      endpointWithParams(link, params, getParams(paramsObject)),
      bodyData,
      { headers },
    );

    return result.data;
  };

  const { mutate, mutateAsync, isLoading, isError, isSuccess, error, data } =
    useMutation<TData, ApiErrorResponse, MutationVariables<TBody, TParams>>(
      (body) => createPost(body),
      {
        mutationKey: queryKey,
        onSuccess: (data, variables) => {
          setSuccess();

          if (variables?.successMessage) {
            toast.success(variables.successMessage);
          }
        },
        onError: (error, variables) => {
          setError();
          const message =
            variables.errorMessage ||
            error?.response?.data?.message ||
            "Coś poszło nie tak 😢";
          toast.error(message);
        },
        onSettled: () => {
          queryClient.invalidateQueries([queryKey, link]);
        },
      },
    );

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
