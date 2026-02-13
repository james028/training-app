import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";

// TQueryFnData: to, co faktycznie zwraca Axios (surowe dane)
// TData: to, co zwraca hook (domyślnie to samo, co surowe dane)
type QueryConfig<TQueryFnData, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, Error, TData>,
  "queryKey" | "queryFn"
>;

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

const useGetApi = <TQueryFnData, TData = TQueryFnData>({
  link,
  queryKey,
  params,
  paramsObject,
  headers,
  options,
}: {
  link: string;
  queryKey: QueryKey;
  params?: Record<string, any>;
  paramsObject?: Record<string, any>;
  headers?: RawAxiosRequestHeaders;
  options?: QueryConfig<TQueryFnData, TData>; // Używamy naszego helpera
}): GetApiResult<TData> => {
  // getList zwraca surowe dane z API (TQueryFnData)
  const getList = async (): Promise<TQueryFnData> => {
    const result = await axios.get<TQueryFnData>(
      endpointWithParams(link, params, getParams(paramsObject)),
      { headers },
    );
    return result.data;
  };

  const { isRefetching, isLoading, isError, data, status, refetch, error } =
    useQuery<TQueryFnData, Error, TData>({
      queryKey: queryKey,
      queryFn: getList,
      ...options,
    });

  return {
    data,
    isLoading,
    isError,
    status,
    refetch,
    isRefetching,
    error,
  } as GetApiResult<TData>;
};

export default useGetApi;
