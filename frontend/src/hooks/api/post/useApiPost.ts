import {
  QueryClient,
  QueryKey,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { useState } from "react";

const queryClient = new QueryClient();

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
type StatusProps = "loading" | "success" | "error";

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
) =>
  // : {
  //mutation: UseMutationResult<Promise<any>, Error, any>;
  // responseStatus: Status;
  //}
  {
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

    const mutation = useMutation<Promise<any>, Error, any>(
      (body) => createPost(body),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([queryKey, link]);
          setSuccess();
        },
        onError: () => {
          setError();
        },
        onSettled: () => {
          queryClient.invalidateQueries([queryKey, link]);
        },
      },
    );

    return { responseStatus, mutation };
  };

export default usePostApi;
