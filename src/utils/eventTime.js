import { formattedTimestamp } from "./timestampFormatter"

export const eventTime = (startTime, endTime) => {
  const start = formattedTimestamp(startTime).time;
  const end = endTime ? formattedTimestamp(endTime).time : "???"

  return (`${start} - ${end}`);

}