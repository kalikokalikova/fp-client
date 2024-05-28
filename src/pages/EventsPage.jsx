import React from "react";
import { Link } from "react-router-dom";

const events = [
  { id: 1, name: "foo", datetime: "a date and time", description: "blah blah blah" },
  { id: 2, name: "bar", datetime: "a date and time", description: "blah blah blah" },
  { id: 3, name: "baz", datetime: "a date and time", description: "blah blah blah" },
];

export default function EventsPage() {
  return <>
  {events.map((event) =>
    <Link key={event.id} to={`${event.id}`}>{event.name}</Link>
  )}
  </>;
}
