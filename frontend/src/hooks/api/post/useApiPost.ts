import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

const queryClient = new QueryClient();

const usePostApi = (
  link: string,
  queryKey: Array<any> | string,
  params?: Record<any, any>,
) => {
  const createPost = async (
    bodyData?: Record<any, any>,
    paramsObj?: Record<string, string | number>,
  ): Promise<any> => {
    const ee = {
      month: "1",
      day: "13",
      duration: "11:22:33",
      isDifferentExercises: "No",
    };
    console.log(bodyData, "bodyData");
    console.log(getParams(paramsObj), "getParams(paramsObj)");
    console.log(paramsObj, "paramsObj");
    const result = await axios.post<string>(
      endpointWithParams(link, params, getParams(ee)),
      //bodyData,
    );

    return result.data;
  };

  return useMutation<any, Error, any>(createPost, {
    onSuccess: (data: Record<string, any>) => {
      // @ts-ignore

      console.log(data, "dd");
      queryClient.invalidateQueries(["aa"]);
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
