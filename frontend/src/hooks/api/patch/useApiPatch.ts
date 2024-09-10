import { QueryClient, QueryKey, useMutation } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

const queryClient = new QueryClient();

const usePatchApi = (
  link: string,
  queryKey: Array<QueryKey> | QueryKey,
  params?: Record<any, any> | null | undefined,
  headers?: RawAxiosRequestHeaders | undefined,
) => {
  const updatePatch = async ({
    paramsObj,
    bodyData,
  }: {
    paramsObj: Record<any, any> | null | undefined;
    bodyData: Record<any, any> | null | undefined;
  }): Promise<any> => {
    const result = await axios.patch<string>(
      endpointWithParams(link, params, getParams(paramsObj)),
      bodyData,
      { headers },
    );

    return result.data;
  };

  return useMutation<Promise<any>, Error, any>((body) => updatePatch(body), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey, link]);
    },
    onError: () => {
      console.log("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey, link]);
    },
  });
};

export default usePatchApi;
