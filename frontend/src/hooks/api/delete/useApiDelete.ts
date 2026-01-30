import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ApiErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

interface MutationVariables<
  TBody = Record<string, any>,
  TParams = Record<string, any>,
> {
  bodyData?: TBody | null;
  paramsObject?: TParams | null;
  successMessage?: string;
  errorMessage?: string;
}

const useDeleteApi = <
  TData,
  TBody extends Record<string, any>,
  TParams extends Record<string, any>,
>(
  link: string,
  invalidateKeys: QueryKey[],
  params?: Record<string, any> | null | undefined,
  headers?: RawAxiosRequestHeaders | undefined,
): UseMutationResult<
  TData,
  ApiErrorResponse,
  MutationVariables<TBody, TParams>
> => {
  const queryClient = useQueryClient();

  const deleteMethod = async (
    paramsObject: MutationVariables<TBody, TParams>,
  ): Promise<TData> => {
    const result = await axios.delete<TData>(
      endpointWithParams(link, params, getParams(paramsObject)),
      { headers },
    );

    return result.data;
  };

  return useMutation<
    TData,
    ApiErrorResponse,
    MutationVariables<TBody, TParams>
  >((body) => deleteMethod(body), {
    onSuccess: (data, variables) => {
      if (variables?.successMessage) {
        toast.success(variables.successMessage);
      }
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: key,
            exact: true,
          });
        });
      }
    },
    onError: (error, variables) => {
      const message =
        variables.errorMessage ||
        error?.response?.data?.message ||
        "Coś poszło nie tak 😢";
      toast.error(message);
    },
  });
};

export default useDeleteApi;
