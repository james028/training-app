import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

const queryClient = new QueryClient();

const usePostApi = (
  link: string,
  queryKey: Array<any> | string,
  params?: Record<any, any>,
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
    );

    return result.data;
  };

  return useMutation<any, Error, any>((body) => createPost(body), {
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

export default usePostApi;
