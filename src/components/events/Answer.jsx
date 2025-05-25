import React from "react";
import { Box, Typography } from "@mui/material";

function Answer({ answer }) {
  return (
    <Box sx={{ display: "block" }}>
    <Typography className="barlow-regular">{answer.answer_text}</Typography>
    <Typography className="barlow-regular" sx={{ fontSize: ".85rem", color: "#00000070"}}>{answer.created_at}</Typography>
    </Box>
  );
}

export default Answer;
