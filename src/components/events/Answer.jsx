import React from "react";
import { Box, Typography } from "@mui/material";

function Answer({ answer }) {
  return (
    <>
    <Typography>{answer.answer_text}</Typography>
    <Typography>{answer.created_at}</Typography>
    </>
  );
}

export default Answer;
