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
  customLink?: string;
  successMessage?: string;
  errorMessage?: string;
}

const useDeleteApi = <
  TData,
  TBody extends Record<string, any>,
  TParams extends Record<string, any>,
>(
  invalidateKeys: QueryKey[],
  link?: string,
  params?: Record<string, any> | null | undefined,
  headers?: RawAxiosRequestHeaders | undefined,
): UseMutationResult<
  TData,
  ApiErrorResponse,
  MutationVariables<TBody, TParams>
> => {
  const queryClient = useQueryClient();

  const deleteMethod = async ({
    paramsObject,
    customLink,
  }: MutationVariables<TBody, TParams>): Promise<TData> => {
    const targetLink = customLink || link || "";

    if (!targetLink) {
      throw new Error("Brak zdefiniowanego linku dla mutacji DELETE.");
    }

    const result = await axios.delete<TData>(
      endpointWithParams(targetLink, params, getParams(paramsObject)),
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
