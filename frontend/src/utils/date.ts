import { DateTime } from "luxon";

export const createDateTime = (
  year: number,
  month: number,
  day: number,
): string => {
  return DateTime.fromObject({ year, month, day }).toISO() as string; // "2026-02-01T00:00:00.000+01:00"
};
