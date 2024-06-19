import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { useMutation } from "@tanstack/react-query";

const useDeleteApi = (
  link: string,
  queryKey: Array<any> | string,
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

  return useMutation<any, Error, any>(deleteMethod, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(queryKey);
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

export default useDeleteApi;
