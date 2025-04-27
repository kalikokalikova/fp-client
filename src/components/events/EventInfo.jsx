import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { Container } from "@mui/system";
import { formattedTimestamp } from "../../utils/timestampFormatter";
import { ResizedTextLine } from "../ResizedTextLine";

export default function EventInfo({ data }) {

  let lines = ["This is a new event", "It happens on Sunday", "let's go"]
  let containerWidth = "600px"

  return (
    <div style={{ width: containerWidth, border: '1px solid black' }}>
      {lines.map((line, index) => (
        <ResizedTextLine key={index} text={line} containerWidth={containerWidth} />
      ))}
    </div>
  );

  // return (
  //   <Container>
  //     <Box sx={{ textTransform: "uppercase", display: "flex", justifyContent: "space-between"}}>
  //       {/* <Typography sx={{ textTransform: "uppercase"}}>{data.event.title}</Typography> */}
  //       <span>This</span>
  //       <span>Is</span>
  //       <span>A</span>
  //       <span>New</span>
  //       <span>Event</span>
  //     </Box>
  //     <Box>
  //       <Typography>
  //         {formattedTimestamp(data.event.start_date_time).date}
  //       </Typography>
  //       <Typography gutterBottom>
  //         {formattedTimestamp(data.event.start_date_time).time}
  //       </Typography>
  //       {data.event.end_date_time && (
  //         <>
  //           <Typography>
  //             {formattedTimestamp(data.event.end_date_time).date}
  //           </Typography>
  //           <Typography gutterBottom>
  //             {formattedTimestamp(data.event.end_date_time).time}
  //           </Typography>
  //         </>
  //       )}
  //       <Typography gutterBottom>Add to calendar</Typography>
  //     </Box>
  //     <Box>
  //       <Typography>{data.location.address_1}</Typography>
  //       <Typography gutterBottom>{data.location.address_2}</Typography>
  //     </Box>
  //     <Box>
  //       <Typography gutterBottom>{data.event.description}</Typography>
  //     </Box>
  //     <Box>
  //       <Typography>Organized by {data.event.host}</Typography>
  //     </Box>
  //     <Box>
  //       <Button>Save</Button>
  //       <Button>Share</Button>
  //     </Box>
  //   </Container>
  // );
}
