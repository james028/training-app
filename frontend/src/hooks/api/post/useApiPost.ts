import {
  MutateOptions,
  QueryClient,
  QueryKey,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
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

interface MutationVariables {
  //body: TBody; // Zastąp TBody rzeczywistym typem danych wejściowych
  //body: any; // Zastąp TBody rzeczywistym typem danych wejściowych
  successMessage?: string;
  errorMessage?: string;

  paramsObj: Record<any, any> | null | undefined;
  bodyData: Record<any, any> | null | undefined;
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

  //console.log(responseStatus, "1");
  return { responseStatus, setLoading, setSuccess, setError };
};

const usePostApi = (
  link: string,
  queryKey: Array<QueryKey> | QueryKey,
  params?: Record<any, any> | null | undefined,
  headers?: RawAxiosRequestHeaders | undefined,
): {
  responseStatus: Status;
  mutate: any;
  mutateAsync: any;
  // mutateAsync: (
  //   variables: any,
  //   options?: MutateOptions<Promise<any>, Error, any, unknown>,
  // ) => Promise<Promise<any>>;
} => {
  const { responseStatus, setLoading, setSuccess, setError } =
    useSetResponseStatus();

  const createPost = async ({
    paramsObj,
    bodyData,
  }: {
    paramsObj: Record<any, any> | null | undefined;
    bodyData: Record<any, any> | null | undefined;
  }): Promise<any> => {
    setLoading();

    const result = await axios.post<string>(
      endpointWithParams(link, params, getParams(paramsObj)),
      bodyData,
      { headers },
    );

    return result.data;
  };

  const { mutate, mutateAsync } = useMutation<
    Promise<any>,
    ApiErrorResponse,
    MutationVariables
  >((body) => createPost(body), {
    onSuccess: (data, variables) => {
      //queryClient.invalidateQueries([queryKey, link]);
      setSuccess();
      if (variables?.successMessage) {
        toast.success(variables.successMessage);
      }
    },
    onError: (error: any, variables: any) => {
      setError();
      const message =
        variables.errorMessage ||
        error?.response?.data?.message ||
        "Coś poszło nie tak 😢";
      toast.error(message);
      // if (variables?.errorMessage) {
      //   toast.error(variables.errorMessage);
      // }
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey, link]);
    },
  });

  return { responseStatus, mutate, mutateAsync };
};

export default usePostApi;
