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
import { DateTime } from "luxon";

export type PlankSessionDTO = {
  id: string;
  month: string; // "01" - "12"
  day: string; // "01" - "31"
  duration: string; // "HH:mm:ss"
  isDifferentExercises: boolean;
};

export type SessionDTO = {
  id: string;
  userId: string;
  duration: string;
  date: string;
  isDifferentExercises: boolean;
};

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

  const initialAcc: Record<string, PlankSessionDTO[]> = {};
  for (let i = 1; i <= 12; i++) {
    initialAcc[i] = [];
  }

  const groupedData = plankListData?.reduce((acc, session: any) => {
    const dt = DateTime.fromISO(session.date, { zone: "utc" });
    const monthIndex = DateTime.fromISO(session.date, { zone: "utc" }).month;
    const month = dt.toFormat("MM");
    const day = dt.toFormat("dd");

    console.log(session, "session");

    if (!acc[monthIndex]) acc[monthIndex] = [];
    acc[monthIndex].push({
      id: session.id,
      month,
      day,
      duration: session.duration,
      isDifferentExercises: session.isDifferentExercises,
    });
    return acc;
  }, initialAcc);

  if (isLoading) {
    return <Loading />;
  }
  if (plankListData.length === 0) {
    return <div className="mt-3">Brak danych</div>;
  }
  console.log(groupedData);

  return (
    <>
      <StyledPlankSectionContainer>
        {Object.entries(groupedData).map(([key, _]) => {
          return (
            <PlankMonthListItem
              key={key}
              itemData={groupedData[key] || []}
              item={key}
            />
          );
        })}
      </StyledPlankSectionContainer>
    </>
  );
};

export default PlankMonthList;
