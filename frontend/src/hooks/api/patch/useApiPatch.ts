import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { RawAxiosRequestHeaders } from "axios";
import { endpointWithParams, getParams } from "../apiUtils";
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

const usePatchApi = <
  TData,
  TBody extends Record<string, any>,
  TParams extends Record<string, any>,
>({
  link,
  params,
  headers,
  invalidateKeys = [],
}: {
  link: string;
  params?: Record<string, any> | null | undefined;
  headers?: RawAxiosRequestHeaders | undefined;
  invalidateKeys?: QueryKey[];
}): UseMutationResult<
  TData,
  ApiErrorResponse,
  MutationVariables<TBody, TParams>
> => {
  const queryClient = useQueryClient();
  const updatePatch = async ({
    paramsObject,
    bodyData,
  }: MutationVariables<TBody, TParams>): Promise<TData> => {
    const result = await axios.patch<TData>(
      endpointWithParams(link, params, getParams(paramsObject)),
      bodyData,
      { headers },
    );
    return result.data;
  };

  return useMutation<
    TData,
    ApiErrorResponse,
    MutationVariables<TBody, TParams>
  >({
    mutationFn: (body) => updatePatch(body),
    onSuccess: (data, variables) => {
      if (variables?.successMessage) {
        toast.success(variables.successMessage);
      }
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: key,
            //refetchType: refetchActive ? "active" : "all",
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

export default usePatchApi;
