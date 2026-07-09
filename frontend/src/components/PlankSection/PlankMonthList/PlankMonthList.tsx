import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";
import { API_ENDPOINTS, URL } from "../../../constants";
import { PLANK_KEYS } from "../../../constants/query-keys";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { usePlankConvertedData } from "../utils/usePlankConvertedData";

type TPlankData = {
  [key: string]: SessionDTO[];
};

export type SessionDTO = {
  id: string;
  userId: string;
  duration: string;
  date: string;
  isDifferentExercises: boolean;
};

export type PlankGroupedSession = {
  id: string;
  month: string; // "01"
  day: string; // "01"
  duration: string;
  isDifferentExercises: boolean;
};

export type PlankMonthGroup = {
  month: string; // "01" - "12"
  items: PlankGroupedSession[];
};

export type PlankItems = PlankMonthGroup[];

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

  const plankItems = usePlankConvertedData(plankListData);

  if (isLoading) {
    return <Loading />;
  }
  if (plankListData.length === 0) {
    return <div className="mt-3">Brak danych</div>;
  }

  return (
    <>
      <StyledPlankSectionContainer>
        {plankItems.map((monthGroup) => (
          <PlankMonthListItem
            key={monthGroup.month}
            item={monthGroup.month}
            itemData={monthGroup.items}
          />
        ))}
      </StyledPlankSectionContainer>
    </>
  );
};

export default PlankMonthList;
