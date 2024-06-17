import React, { useState, useEffect } from "react";
import dummyEvents from "../components/events/dummyEvents.json";
import { Link } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(dummyEvents);
  }, []);

  const ConstructedEvent = ({ event }) => {
    const backgroundImage = "url(../src/assets/dayCards/Day_1.webp)";
    const startDateTime = event.starttime;
    return (
      <Box
        sx={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover", // Make the background cover the entire element
          backgroundPosition: "center", // Center the image
          width: "250px",
          height: "400px",
          borderRadius: "8px",
          position: "relative",
          margin: "0 15px 15px 0",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff9ef8a",
            position: "absolute",
            bottom: "10px",
            color: "primaryDark",
            width: "87%",
            borderRadius: "6px",
            padding: "8px"
          }}
        >
          <Typography>{event.title}</Typography>
          <Typography>{startDateTime}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ backgroundColor: "primaryDark", color: "primaryLight" }}>
        <Container>
          <Typography variant="h5">
            Events in 98103
            <SearchIcon />
          </Typography>
          <Box sx={{ display: "flex" }}>
            {events.map((event) => (
              <Link key={event.id} to={`${event.id}`}>
                <ConstructedEvent event={event} />
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
