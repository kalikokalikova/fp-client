import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { Box, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import Event from "../components/events/EventInfo";
import QandAs from "../components/events/QandAs";

export default function EventPage() {
  const params = useParams();

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
        <Box>
          {isLoading ? (
            <Typography>Loading ...</Typography>
          ) : data ? (
            <>
              <Event data={data} />
              { data.questions && <QandAs qAndAData={data.questions} />}
            </>
          ) : (
            <Typography>Unable to load this event.</Typography>
          )}
        </Box>
      }
    </>
  );
}
