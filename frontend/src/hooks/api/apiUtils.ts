export const getParams = (
  paramsObj: Record<string, string | number> | undefined,
): Record<string, string | number> | undefined | null => {
  //return `_end=${end}&_order=${order}&_sort=${sort}&_start=${start}&`;

  const newParamsObj: Record<string, string | number> = {};

  Object.keys(paramsObj ?? {}).forEach((key) => {
    newParamsObj[`${key}`] = (paramsObj ?? {})[key];
  });

  return Object.keys(paramsObj ?? {}).length > 0 ? paramsObj : null;
};

export const endpointWithParams = (
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
