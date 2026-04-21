import { DateTime } from "luxon";

export const createDateTime = (
  year: number,
  month: number,
  day: number,
): string => {
  const dt = DateTime.utc(year, month, day).startOf("day");

  if (!dt.isValid) {
    throw new Error("Invalid date input");
  }

  return dt.toISO()!;
};

export const normalizeDate = (dateObject: {
  year: number;
  month: number;
  day: string | number;
}) => ({
  year: Number(dateObject.year),
  month: Number(dateObject.month),
  day: Number(dateObject.day),
});
