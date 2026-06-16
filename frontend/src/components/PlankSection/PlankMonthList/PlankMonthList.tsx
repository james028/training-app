import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";
import { API_ENDPOINTS, URL } from "../../../constants";
import { PLANK_KEYS } from "../../../constants/query-keys";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { TPlankData, TPlankMonthData } from "../../../types";
import { dataPlank } from "../../../mock/plank-mock";

const PlankMonthList = () => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;

  const { data, isLoading, error, isError } = useGetApi<TPlankData>({
    link: `${URL}${API_ENDPOINTS.PLANK.LIST}`,
    queryKey: PLANK_KEYS.plankList(),
    headers: { Authorization: `Bearer ${token}` },
  });
  useToastError(isError, error);
  const plankListData = data?.data ?? [];

  const initialAcc: Record<number, any[]> = {};
  for (let i = 1; i <= 12; i++) {
    initialAcc[i] = [];
  }

  const groupedData = plankListData?.reduce((acc, session: any) => {
    const month = new Date(session.date).getMonth() + 1;
    if (!acc[month]) acc[month] = [];
    acc[month].push(session);
    return acc;
  }, initialAcc);

  if (isLoading) {
    return <Loading />;
  }
  if (plankListData.length === 0) {
    return <div className="mt-3">Brak danych</div>;
  }

  console.log({ plankListData, groupedData, dataPlank });

  return (
    <>
      <StyledPlankSectionContainer>
        {Object.entries(groupedData).map(([key, _]) => {
          return (
            <PlankMonthListItem
              key={key}
              itemData={groupedData[key as any] || []}
              item={key}
            />
          );
        })}
      </StyledPlankSectionContainer>
    </>
  );
};

export default PlankMonthList;
