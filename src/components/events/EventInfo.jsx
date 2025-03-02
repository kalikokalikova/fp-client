import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { Container } from "@mui/system";
import { formattedTimestamp } from "../../utils/timestampFormatter";

export default function EventInfo({ data }) {
  return (
    <Container>
      <Box>
        <Typography>{data.event.title}</Typography>
      </Box>
      <Box>
        <Typography>
          {formattedTimestamp(data.event.start_date_time).date}
        </Typography>
        <Typography gutterBottom>
          {formattedTimestamp(data.event.start_date_time).time}
        </Typography>
        {data.event.end_date_time && (
          <>
            <Typography>
              {formattedTimestamp(data.event.end_date_time).date}
            </Typography>
            <Typography gutterBottom>
              {formattedTimestamp(data.event.end_date_time).time}
            </Typography>
          </>
        )}
        <Typography gutterBottom>Add to calendar</Typography>
      </Box>
      <Box>
        <Typography>{data.location.address_1}</Typography>
        <Typography gutterBottom>{data.location.address_2}</Typography>
      </Box>
      <Box>
        <Typography gutterBottom>{data.event.description}</Typography>
      </Box>
      <Box>
        <Typography>Organized by {data.event.host}</Typography>
      </Box>
      <Box>
        <Button>Save</Button>
        <Button>Share</Button>
      </Box>
    </Container>
  );
}
