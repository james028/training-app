import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { QueryClient, QueryKey, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useDeleteApi = (
  link: string,
  queryKey: Array<QueryKey> | QueryKey,
  params?: Record<any, any>,
) => {
  const deleteMethod = async ({
    paramsObj,
  }: {
    paramsObj: Record<any, any> | null | undefined;
  }): Promise<any> => {
    const result = await axios.delete<string>(
      endpointWithParams(link, params, getParams(paramsObj)),
    );

    return result.data;
  };

  return useMutation<Promise<any>, Error, any>(deleteMethod, {
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

export default useDeleteApi;
