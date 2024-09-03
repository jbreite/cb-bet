import { fromUnixTime, format } from "date-fns";

export function convertUnixToFormattedDate(unixTimestamp: number): string {
  // Convert milliseconds to seconds if necessary
  const timestampInSeconds =
    unixTimestamp > 10000000000
      ? Math.floor(unixTimestamp / 1000)
      : unixTimestamp;

  // Convert Unix timestamp to Date object
  const date = fromUnixTime(timestampInSeconds);

  // Format the date
  // Note: This will use the local time zone of the system running the code
  return format(date, "EEE, MMM d, h:mm a");
}
