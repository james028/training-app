import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

type GetApiResult<TData> = Pick<
  UseQueryResult<TData>,
  | "data"
  | "isLoading"
  | "isError"
  | "status"
  | "refetch"
  | "isRefetching"
  | "error"
> & { data: TData | undefined };

const useGetApi = <TData>({
  link,
  queryKey,
  params,
  paramsObject,
  headers,
}: {
  link: string;
  queryKey: QueryKey;
  params?: Record<string, any>;
  paramsObject?: Record<string, any>;
  headers?: RawAxiosRequestHeaders;
}): GetApiResult<TData> => {
  const getList = async (): Promise<TData> => {
    const result = await axios.get<TData>(
      endpointWithParams(link, params, getParams(paramsObject)),
      { headers },
    );

    return result.data;
  };

  const queryKeyArray = [queryKey];

  const {
    isRefetching,
    isLoading,
    isError,
    data,
    status,
    refetch,
    error,
    dataUpdatedAt,
  } = useQuery<TData>({
    // @ts-ignore
    queryKey: queryKeyArray,
    queryFn: getList,
    staleTime: 60000,
    gcTime: 300000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: true,
  });

  console.log(queryKey);

  return {
    data,
    isLoading,
    isError,
    status,
    refetch,
    isRefetching,
    dataUpdatedAt,
    error,
  } as GetApiResult<TData>;
};
export default useGetApi;
