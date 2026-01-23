import {
  QueryClient,
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
  // queryKey,               ← usuń to pole lub zrób je opcjonalne
  params,
  headers,
  invalidateKeys = [], // ← nowe pole – tablica kluczy do invalidacji
}: {
  link: string;
  // queryKey?: QueryKey;    ← opcjonalne lub usunięte
  params?: Record<string, any> | null | undefined;
  headers?: RawAxiosRequestHeaders | undefined;
  invalidateKeys?: QueryKey[]; // ← dodajemy to
}): UseMutationResult<
  TData,
  ApiErrorResponse,
  MutationVariables<TBody, TParams>
> => {
  const queryClient = useQueryClient(); // ← bierze ten sam QueryClient z React Query Providera
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
  >((body) => updatePatch(body), {
    onSuccess: (data, variables) => {
      if (variables?.successMessage) {
        toast.success(variables.successMessage);
      }
      console.log(
        "[MUTACJA SUCCESS] invalidateKeys =",
        JSON.stringify(invalidateKeys, null, 2),
      );
      console.log("[MUTACJA SUCCESS] variables =", variables);
      // invalidate wszystkich przekazanych kluczy
      invalidateKeys.forEach((key) => {
        console.log("[INVALIDUJĘ klucz] →", JSON.stringify(key, null, 2));
        queryClient.invalidateQueries({
          queryKey: key,
          exact: true,
          refetchType: "all",
        });
      });
    },

    onError: (error, variables) => {
      const message =
        variables.errorMessage ||
        error?.response?.data?.message ||
        "Coś poszło nie tak 😢";
      toast.error(message);
    },

    // onSettled usuwamy lub zostawiamy puste – nie invalidujemy automatycznie starego queryKey
  });
};

export default usePatchApi;
