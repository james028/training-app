import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import { useAppContext } from "../../../appContext/appContext";

//const API_SINGLE_BRIDGE_MANAGEMENT = "/bridge_management/:category:/:id:/";

//otypować
const useGetApi = (
  url: string,
  queryKey: Array<QueryKey> | QueryKey,
  params?: Record<any, any>,
  paramsObj?: Record<string, string | number>,
  //zmienic
  headers?: Record<string, string | number>,
) => {
  const { linkUrl, user } = useAppContext();
  const token = user?.accessToken ?? {};

  const getList = async (): Promise<any> => {
    console.log(endpointWithParams(url, params, getParams(paramsObj)), "A");
    const result = await axios.get<string>(
      endpointWithParams(url, params, getParams(paramsObj)),
      //{ headers },
    );
    // const result = await axios.get("http://localhost:5001/api/plank/list", {
    //   headers: {
    //     // "X-Test": "hello-world",
    //     //Authorization: `Bearer ${token}`,
    //   },
    // });

    return result.data;
  };

  const { isRefetching, isLoading, isError, data, status, refetch } =
    useQuery<any>([queryKey, url], getList);

  return { data, isLoading, isError, status, refetch, isRefetching };
};
export default useGetApi;
