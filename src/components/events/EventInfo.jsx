import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Button, Container, Divider } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import EventIcon from "@mui/icons-material/Event";
import { ResizedTextLine } from "../ResizedTextLine";
import { ShareEventModal } from "./ShareEventModal";
import { formatDateTime } from "../../utils/eventDateTimeFormatter";

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

        { formatDateTime(data.event.start_date_time, data.event.end_date_time).map((line,index) => (
          <ResizedTextLine
            key={index}
            text={line}
            containerWidth={containerWidth}
            initialFontSize={18}
           />
        ))}

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
          initialFontSize={24}
        />

        <Divider sx={{ borderColor: "#FFCB83", margin: "10px 0" }} />

        <Box className="barlow-regular">{data.event.description}</Box>

        <Box
          sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            sx={{ marginRight: "10px", width: "50%" }}
            onClick={() => setShareModalOpen(true)}
          >
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
