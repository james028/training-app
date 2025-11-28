import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

type GetApiResult<TData> = Pick<
  UseQueryResult<TData>,
  "data" | "isLoading" | "isError" | "status" | "refetch" | "isRefetching"
> & { data: TData | undefined }; // Dodajemy TData | undefined

const useGetApi = <TData>({
  url,
  queryKey,
  params,
  paramsObject,
  headers,
}: {
  url: string;
  queryKey: QueryKey;
  params?: Record<string, any>;
  paramsObject?: Record<string, any>;
  headers?: RawAxiosRequestHeaders;
}): GetApiResult<TData> => {
  const getList = async (): Promise<TData> => {
    const result = await axios.get<TData>(
      endpointWithParams(url, params, getParams(paramsObject)),
      { headers },
    );

    return result.data;
  };

  const queryKeyArray = [queryKey, url, params, paramsObject];

  const { isRefetching, isLoading, isError, data, status, refetch } =
    useQuery<TData>({
      queryKey: queryKeyArray,
      queryFn: getList,
    });

  return {
    data,
    isLoading,
    isError,
    status,
    refetch,
    isRefetching,
  } as GetApiResult<TData>;
};
export default useGetApi;
