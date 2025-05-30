import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Typography, Container, Divider } from "@mui/material";
import QRCode from "react-qr-code";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import EventIcon from '@mui/icons-material/Event';
import { formattedTimestamp } from "../../utils/timestampFormatter";
import { ResizedTextLine } from "../ResizedTextLine";

export default function EventInfo({ data }) {
  const elementRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);

  const measureWidth = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      setContainerWidth(element.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureWidth(); // Initial measurement
    const handleResize = () => {
      measureWidth();
    };
    window.addEventListener("resize", handleResize);
    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerWidth]); // Include measureWidth in the dependency array

  return (
    <Container
      ref={elementRef}
      sx={{
        backgroundColor: "#F7FDFF",
        margin: "0 8px",
        width: "auto",
        padding: "5px",
      }}
    >
      <ResizedTextLine
        text={data.event.title}
        containerWidth={containerWidth}
        initialFontSize={28}
      />

      <Divider sx={{ borderColor: "#FFCB83", margin: "10px 0" }} />

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
      <Typography sx={{ display: "flex" }}><EventIcon sx={{ marginRight: "5px"}}/>Add to Calendar</Typography>

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
        text={data.event.host}
        containerWidth={containerWidth}
        initialFontSize={14}
      />

      <Divider sx={{ borderColor: "#FFCB83", margin: "10px 0" }} />

      <Box className="barlow-regular">{data.event.description}</Box>

      <Box
        sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <Button variant="outlined" sx={{ marginRight: "10px", width: "50%" }}>
          <ShareIcon sx={{ marginRight: "5px" }} />
          Share
        </Button>
        <Button sx={{ width: "50%"}}>
          <DownloadIcon sx={{ marginRight: "5px" }} />
          Save
        </Button>
      </Box>
    </Container>
  );
}
