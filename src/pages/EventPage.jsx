import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { Box, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import EventInfo from "../components/events/EventInfo";
import QandAs from "../components/events/QandAs";

export default function EventPage() {
  const params = useParams();
  const [isDaytimeEvent, setIsDaytimeEvent] = useState(false);

  const fetchEvent = async () => {
    const res = await api.get(`/api/v1/events/${params.eventId}`);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", params.eventId],
    queryFn: fetchEvent,
  });

  return (
    <>
      {
        <Box
          sx={{
            backgroundColor: "#007090",
            paddingTop: "10px",
            paddingBottom: "200px",
          }}
        >
          <Box>
          {isLoading ? (
            <Typography>Loading ...</Typography>
          ) : data ? (
            <>
              <EventInfo data={data} />
              {data.questions && <QandAs qAndAData={data.questions} />}
            </>
          ) : (
            <Typography>Unable to load this event.</Typography>
          )}
          </Box>

        </Box>
      }
    </>
  );
}
