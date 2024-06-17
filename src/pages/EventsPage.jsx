import React, {useState, useEffect} from "react";
import dummyEvents from "../components/events/dummyEvents.json";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(dummyEvents)
  },[])


  return <>
  {events.map((event) =>
    <Link key={event.id} to={`${event.id}`}>{event.title}</Link>
  )}
  </>;
}
