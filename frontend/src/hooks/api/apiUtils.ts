export const getParams2 = (
  paramsObj: Record<any, any> | null | undefined,
): Record<string, string | number> | undefined | null => {
  //return `_end=${end}&_order=${order}&_sort=${sort}&_start=${start}&`;

  const newParamsObj: Record<string, string | number> = {};

  Object.keys(paramsObj ?? {}).forEach((key) => {
    newParamsObj[`${key}`] = (paramsObj ?? {})[key];
  });

  return Object.keys(paramsObj ?? {}).length > 0 ? paramsObj : null;
};

export const getParams = (
  paramsObj: Record<string, any> | null | undefined,
): Record<string, string | number> | undefined => {
  if (!paramsObj || Object.keys(paramsObj).length === 0) {
    return;
  }

  const newParamsObj: Record<string, string | number> = {};

  Object.keys(paramsObj).forEach((key) => {
    const value = paramsObj[key];
    if (value !== null && value !== undefined && value !== "") {
      // Konwersja (np. na stringa, jeśli jest to potrzebne dla URLSearchParams)
      // W przeciwnym razie pozostawienie typu Record<string, any> może być lepsze.
      // Jeśli jednak chcemy trzymać się Record<string, string | number>...
      newParamsObj[key] = value;
    }
  });

  // Zwracamy nowy, czysty obiekt, albo undefined, jeśli po czyszczeniu jest pusty
  return Object.keys(newParamsObj).length > 0 ? newParamsObj : undefined;
};

export const endpointWithParams2 = (
  endpoint: string,
  params?: any | null,
  queryParams?: any,
): string => {
  const regex = /:\w+:/g;

  const matches = endpoint.match(regex);

  matches?.forEach((match) => {
    endpoint = endpoint.replace(
      match,
      params?.[match.slice(1, match.length - 1)],
    );
  });

  if (queryParams) {
    const searchParams = new URLSearchParams(queryParams);
    return endpoint.includes("?")
      ? `${endpoint}&${searchParams.toString()}`
      : `${endpoint}?${searchParams.toString()}`;
  }

  return endpoint;
};

type QueryParamsType = Record<string, string | number>;

export const endpointWithParams = (
  endpoint: string,
  pathParams?: Record<string, any> | null,
  queryParams?: QueryParamsType | null,
): string => {
  const regex = /:\w+/g;
  let finalEndpoint = endpoint;

  const matches = finalEndpoint.match(regex);

  if (matches && pathParams) {
    matches.forEach((match) => {
      const paramName = match.slice(1);

      const paramValue = pathParams[paramName];

      // Zabezpieczenie: Jeśli brakuje wartości, zamieniamy na pusty string lub rzucamy błąd
      if (paramValue !== undefined && paramValue !== null) {
        finalEndpoint = finalEndpoint.replace(match, String(paramValue));
      } else {
        // Opcjonalnie: Logowanie błędu, jeśli brakuje wymaganego parametru ścieżki
        console.error(
          `Brak wartości dla wymaganego parametru ścieżki: ${paramName}`,
        );
        finalEndpoint = finalEndpoint.replace(match, ""); // Usuwamy parametr, jeśli brakuje
      }
    });
  }

  if (queryParams) {
    const searchParams = new URLSearchParams(
      queryParams as Record<string, any>,
    );
    return finalEndpoint.includes("?")
      ? `${finalEndpoint}&${searchParams.toString()}`
      : `${finalEndpoint}?${searchParams.toString()}`;
  }

  return finalEndpoint;
};
