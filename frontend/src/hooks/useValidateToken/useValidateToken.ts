import useGetApi from "../api/get/useApiGet";
import { API_ENDPOINTS, URL } from "../../constants";
import { AUTH_KEYS } from "../../constants/query-keys";

type User = {
  id: string;
  email: string;
};

export const useValidateToken = (
  token: string | null,
): {
  isValid: boolean;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
} => {
  const { data, isLoading, isError } = useGetApi<User>({
    link: `${URL}${API_ENDPOINTS.AUTH.AUTH_ME}`,
    queryKey: AUTH_KEYS.authMe(),
    headers: { Authorization: `Bearer ${token}` },
    options: {
      enabled: !!token,
      retry: false,
    },
  });

  if (!token) {
    return {
      isValid: false,
      isLoading: false,
      isError: false,
      user: null,
    };
  }
  if (isLoading) {
    return {
      isValid: false,
      isLoading: true,
      isError: false,
      user: null,
    };
  }

  if (isError) {
    return {
      isValid: false,
      isLoading: false,
      isError: true,
      user: null,
    };
  }

  if (data) {
    return {
      isValid: true,
      isLoading: false,
      isError: false,
      user: data,
    };
  }

  return {
    isValid: false,
    isLoading: false,
    isError: true,
    user: null,
  };
};
