import { formattedTimestamp } from "./timestampFormatter"

export const eventTime = (startTime, endTime) => {
  const start = formattedTimestamp(startTime).time;
  const end = endTime ? formattedTimestamp(end).time : "???"

  return (`${start} - ${end}`);

}