import { formattedTimestamp } from "./timestampFormatter";

export const formatDateTime = (start, end) => {
  let result;
  // event starts and ends on different dates
  if (end && start != end) {
    console.log("end and start and end")
    result = [
      `${formattedTimestamp(start).date} ${formattedTimestamp(start).time}`,
      `${formattedTimestamp(end).date} ${formattedTimestamp(end).time}`,
    ]
  // event starts and ends on same date, and there is an end time
  } else if (end) {
    result = [
      `${formattedTimestamp(start).date}`,
      `${formattedTimestamp(start).time} - ${formattedTimestamp(end).time}`
    ]
  // event has no end datetime
  } else {
    result = [
      `${formattedTimestamp(start).date}`,
      `${formattedTimestamp(start).time} - ???`
    ]
  }
  return result
};
