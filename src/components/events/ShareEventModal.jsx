import React, { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "react-qr-code";
import { Button, Box, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ResizedTextLine } from "../ResizedTextLine";
import { formattedTimestamp } from "../../utils/timestampFormatter";
import { eventTime } from "../../utils/eventTime";

export function ShareEventModal({ open, handleClose, data }) {
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

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            overflowY: "visible",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent dividers ref={elementRef} sx={{ width: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <QRCode
              value={`${import.meta.env.VITE_FRONTEND_URL}/events/${
                data.event.id
              }`}
              style={{ height: "auto", maxWidth: "50%" }}
            />
          </Box>

          <ResizedTextLine
            text={data.event.title}
            containerWidth={containerWidth}
            initialFontSize={24}
          />
          <Divider sx={{ borderColor: "#FFCB83", margin: "10px 0" }} />
          <ResizedTextLine
            text={formattedTimestamp(data.event.start_date_time).date}
            containerWidth={containerWidth}
            initialFontSize={18}
          />
          <ResizedTextLine
            text={eventTime(
              data.event.start_date_time,
              data.event.end_date_time
            )}
            containerWidth={containerWidth}
            initialFontSize={24}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ width: "50%" }}>
            <ContentCopyIcon sx={{ marginRight: "5px" }} />
            Copy URL
          </Button>
          <Button sx={{ width: "50%" }} variant="outlined">
            <DownloadIcon sx={{ marginRight: "5px" }} />
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
