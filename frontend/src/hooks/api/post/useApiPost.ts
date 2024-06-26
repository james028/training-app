import { QueryClient, useMutation } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

const queryClient = new QueryClient();

const usePostApi = (
  link: string,
  queryKey: Array<any> | string,
  params?: Record<any, any> | null | undefined,
  headers?: RawAxiosRequestHeaders | undefined,
) => {
  const createPost = async ({
    paramsObj,
    bodyData,
  }: {
    paramsObj: Record<any, any> | null | undefined;
    bodyData: Record<any, any> | null | undefined;
  }): Promise<any> => {
    const result = await axios.post<string>(
      endpointWithParams(link, params, getParams(paramsObj)),
      bodyData,
      { headers },
    );

    return result.data;
  };

  return useMutation<Promise<any>, Error, any>((body) => createPost(body), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey, link]);
    },
    onError: () => {
      console.log("there was an error");
    },
    onSettled: () => {
      // // @ts-ignore
      // queryClient.invalidateQueries("create");
    },
  });
};

export default usePostApi;
