import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

//const API_SINGLE_BRIDGE_MANAGEMENT = "/bridge_management/:category:/:id:/";

//otypować
const useGetApi = (
  url: string,
  queryKey: Array<QueryKey> | QueryKey,
  params?: Record<any, any>,
  paramsObj?: Record<string, string | number>,
) => {
  const getList = async (): Promise<any> => {
    const result = await axios.get<string>(
      endpointWithParams(url, params, getParams(paramsObj)),
    );

    return result.data;
  };

  const { isRefetching, isLoading, isError, data, status, refetch } =
    useQuery<any>([queryKey, url], getList);

  return { data, isLoading, isError, status, refetch, isRefetching };
};
export default useGetApi;
