export const formattedTimestamp = (timestamp) => {

  const date = new Date(timestamp);

  let timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  timeString = timeString.startsWith("0") ? timeString.substring(1) : timeString;

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    time: timeString,
    date: dateString,
  };
};
