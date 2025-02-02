export const formattedTimestamp = (timestamp) => {
  console.log(timestamp);

  const date = new Date(timestamp);

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  console.log(timeString);

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

	console.log(dateString)

  return {
    time: timeString,
    date: dateString,
  };
};
