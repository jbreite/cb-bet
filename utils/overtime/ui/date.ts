import { fromUnixTime, format } from "date-fns";

export function convertUnixToFormattedDate(unixTimestamp: number): string {
  const date = fromUnixTime(unixTimestamp);
  return format(date, "EEE, MMM d, h:mm a");
}
