import { useMemo } from "react";
import { DateTime } from "luxon";
import {
  PlankGroupedSession,
  PlankItems,
  SessionDTO,
} from "../PlankMonthList/PlankMonthList";

export const usePlankConvertedData = (
  sessions: SessionDTO[] = [],
): PlankItems => {
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

export const usePlankConvertedData2 = (data: SessionDTO[] = []) => {
  const initialAcc: Record<string, PlankGroupedSession[]> = {};
  for (let i = 1; i <= 12; i++) {
    const index = String(i).padStart(2, "0");
    initialAcc[index] = [];
  }

  const groupedData = data.reduce<Record<string, PlankGroupedSession[]>>(
    (acc, session) => {
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
    },
    initialAcc,
  );

  return Object.entries(groupedData).sort(([a], [b]) => Number(a) - Number(b));
};

/*{sorteredGroupedData.map(([key, _]) => {*/
/*  return (*/
/*    <PlankMonthListItem*/
/*      key={key}*/
/*      itemData={groupedData[key] || []}*/
/*      item={key}*/
/*    />*/
/*  );*/
/*})}*/
