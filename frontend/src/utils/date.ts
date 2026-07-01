import { DateTime } from "luxon";

type BuildDatePayloadParams = {
  month: string; // "01" - "12"
  day: string; // "01" - "31"
  year?: number; // opcjonalnie
};

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

export const buildPlankDate = ({
  month,
  day,
  year,
}: BuildDatePayloadParams): string => {
  const nowYear = year ?? DateTime.now().year;

  return DateTime.fromObject(
    {
      year: nowYear,
      month: Number(month),
      day: Number(day),
    },
    { zone: "utc" },
  ).toISO()!;
};
