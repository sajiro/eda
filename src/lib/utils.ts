import { type ClassValue, clsx } from "clsx";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDateRangeToString(dateRange: DateRange | null) {
  if (dateRange && dateRange.from && dateRange.to) {
    const from = new Date(dateRange.from);
    const to = new Date(dateRange.to);

    const fromString = `${from.getUTCFullYear()}-${String(
      from.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(from.getUTCDate()).padStart(
      2,
      "0"
    )}T00:00:00.000000Z`;
    const toString = `${to.getUTCFullYear()}-${String(
      to.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(to.getUTCDate()).padStart(
      2,
      "0"
    )}T00:00:00.000000Z`;

    return `${fromString}/${toString}`;
  }
  return "";
}

export function getCurrentDateRange(): string {
  const toDate = new Date();
  const fromDate = new Date();

  fromDate.setDate(toDate.getDate() - 10);

  return convertDateRangeToString({ from: fromDate, to: toDate });
}
