import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";
import { API_ENDPOINTS, URL } from "../../../constants";
import { PLANK_KEYS } from "../../../constants/query-keys";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { TPlankData } from "../../../types";

const PlankMonthList = () => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;

  const { data, isLoading, error, isError } = useGetApi<TPlankData>({
    link: `${URL}${API_ENDPOINTS.PLANK.LIST}`,
    queryKey: PLANK_KEYS.plankList(),
    headers: { Authorization: `Bearer ${token}` },
  });
  useToastError(isError, error);
  const plankList = data?.data ?? [];

  if (isLoading) {
    return <Loading />;
  }
  if (plankList.length === 0) return <div className="mt-3">Brak danych</div>;

  return (
    <>
      {plankList.map((itemData, index: number) => {
        //console.log(itemData, "itemData");
        return (
          <StyledPlankSectionContainer key={index}>
            {Object.entries(itemData).map(([key, value]) => {
              return (
                <PlankMonthListItem key={key} itemData={itemData} item={key} />
              );
            })}
          </StyledPlankSectionContainer>
        );
      })}
    </>
  );
};

export default PlankMonthList;
