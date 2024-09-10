import { QueryClient, useMutation } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { useState } from "react";
import { string } from "yup";

const queryClient = new QueryClient();

const useFeedbackIndicator = () => {
  const [status, setStatus] = useState<any>();

  let indicator;

  if (status === "loading") {
    indicator = "L";
  } else if (status === "success") {
    indicator = "S";
  } else if (status === "error") {
    indicator = "E";
  }

  const setLoading = () => setStatus("loading");
  const setSuccess = () => {
    setStatus("success");
    //setupTimerToClearStatus();
  };
  const setError = () => {
    setStatus("error");
    //setupTimerToClearStatus();
  };

  console.log(indicator, "1");
  return { indicator, setLoading, setSuccess, setError };
};

const usePostApi = (
  link: string,
  queryKey: Array<any> | string,
  params?: Record<any, any> | null | undefined,
  headers?: RawAxiosRequestHeaders | undefined,
) => {
  //const [error, setError] = useState(false);

  const { indicator, setLoading, setSuccess, setError } =
    useFeedbackIndicator();

  console.log(indicator, "2");

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
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey, link]);
        setSuccess();
      },
      onError: () => {
        //alert("there was an error");
        setError();
      },
      onSettled: () => {
        // // @ts-ignore
        // queryClient.invalidateQueries("create");
        queryClient.invalidateQueries([queryKey, link]);
      },
    },
  );

  return { mutation, indicator };
};

export default usePostApi;
