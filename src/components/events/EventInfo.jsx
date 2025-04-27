import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Typography, Container,Divider } from "@mui/material";
import QRCode from "react-qr-code";
import { formattedTimestamp } from "../../utils/timestampFormatter";
import { ResizedTextLine } from "../ResizedTextLine";

export default function EventInfo({ data }) {
  const [containerWidth, setContainerWidth] = useState(300);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setContainerWidth(300); // Example dynamic width
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <Container
      sx={{
        textTransform: "uppercase",
      }}
    >
      <ResizedTextLine
        text={data.event.title}
        containerWidth={containerWidth}
        initialFontSize={28}
      />

      <Divider sx={{ borderColor: "white", margin: "10px 0" }} />

      <ResizedTextLine
        text={formattedTimestamp(data.event.start_date_time).date}
        containerWidth={containerWidth}
        initialFontSize={18}
      />
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

      <ResizedTextLine
        text={`${data.location.address_1}`}
        containerWidth={containerWidth}
        initialFontSize={20}
      />
      <ResizedTextLine
        text={`${data.location.address_2}`}
        containerWidth={containerWidth}
        initialFontSize={14}
      />

      <ResizedTextLine
        text={data.event.description}
        containerWidth={containerWidth}
        initialFontSize={14}
      />

      <ResizedTextLine
        text={data.event.host}
        containerWidth={containerWidth}
        initialFontSize={14}
      />

      <Box>
        <Button>Save</Button>
        <Button>Share</Button>
      </Box>
    </Container>
  );
}
