import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

type TUseGetApi = {
  paramsObj?: Record<string, any> | undefined;
};

//const API_SINGLE_BRIDGE_MANAGEMENT = "/bridge_management/:category:/:id:/";

//otypować
const useGetApi = (
  url: string,
  queryKey: Array<any> | string,
  params?: Record<any, any>,
  paramsObj?: Record<string, string | number>,
): any => {
  const getList = async (): Promise<any> => {
    const result = await axios.get<string>(
      endpointWithParams(url, params, getParams(paramsObj)),
    );

    return result.data;
  };

  const { isRefetching, isLoading, isError, data, status, refetch } =
    useQuery<any>([queryKey], getList);

  return { data, isLoading, isError, status, refetch, isRefetching };
};
export default useGetApi;
