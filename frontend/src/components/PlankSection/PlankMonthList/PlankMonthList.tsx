import React, { useMemo } from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";
import { API_ENDPOINTS, URL } from "../../../constants";
import { PLANK_KEYS } from "../../../constants/query-keys";
import { useToastError } from "../../../hooks/useToastError/useToastError";
import { DateTime } from "luxon";

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

  const usePlankConvertedData = (sessions: SessionDTO[] = []): PlankItems => {
    return useMemo(() => {
      const calendar: PlankItems = Array.from({ length: 12 }, (_, i) => ({
        month: String(i + 1).padStart(2, "0"),
        items: [],
      }));

      for (const session of sessions) {
        const dt = DateTime.fromISO(session.date, { zone: "utc" });

        const month = dt.toFormat("MM");
        const day = dt.toFormat("dd");

        const group = calendar.find((m) => m.month === month);

        if (group) {
          group.items.push({
            id: session.id,
            month,
            day,
            duration: session.duration,
            isDifferentExercises: session.isDifferentExercises,
          });
        }
      }

      return calendar;
    }, [sessions]);
  };

  const plankItems = usePlankConvertedData(plankListData);

  const initialAcc: Record<string, PlankGroupedSession[]> = {};
  for (let i = 1; i <= 12; i++) {
    const index = String(i).padStart(2, "0");
    initialAcc[index] = [];
  }

  const groupedData = plankListData.reduce<
    Record<string, PlankGroupedSession[]>
  >((acc, session) => {
    const dt = DateTime.fromISO(session.date, { zone: "utc" });

    const month = dt.toFormat("MM");
    const day = dt.toFormat("dd");

    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push({
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

  // const sorteredGroupedData = Object.entries(groupedData).sort(
  //   ([a], [b]) => Number(a) - Number(b),
  // );

  return (
    <>
      <StyledPlankSectionContainer>
        {/*{sorteredGroupedData.map(([key, _]) => {*/}
        {/*  console.log(key, "key");*/}
        {/*  return (*/}
        {/*    <PlankMonthListItem*/}
        {/*      key={key}*/}
        {/*      itemData={groupedData[key] || []}*/}
        {/*      item={key}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
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
