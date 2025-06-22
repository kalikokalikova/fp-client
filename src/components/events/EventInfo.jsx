import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Typography, Container, Divider } from "@mui/material";
import QRCode from "react-qr-code";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import EventIcon from "@mui/icons-material/Event";
import { formattedTimestamp } from "../../utils/timestampFormatter";
import { ResizedTextLine } from "../ResizedTextLine";
import { ShareEventModal } from "./ShareEventModal";
import { eventTime } from "../../utils/eventTime";

export default function EventInfo({ data }) {
  const elementRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);
  const [shareModalOpen, setShareModalOpen] = useState(false);
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
    <>
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

        <ResizedTextLine
          text={eventTime(data.event.start_date_time, data.event.end_date_time)}
          containerWidth={containerWidth}
          initialFontSize={24}
         />

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
          <Button variant="outlined" sx={{ marginRight: "10px", width: "50%" }} onClick={() => setShareModalOpen(true)}>
            <ShareIcon sx={{ marginRight: "5px" }} />
            Share
          </Button>
          <Button sx={{ width: "50%" }}>
          <EventIcon sx={{ marginRight: "5px" }} />
          Add to Calendar
          </Button>
        </Box>
      </Container>
      <ShareEventModal
        handleClose={() => setShareModalOpen(false)}
        open={shareModalOpen}
        data={data}
      />
    </>
  );
}
