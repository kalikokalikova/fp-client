import React from "react";
import { Box } from "@mui/material";

function Answer({ answer }) {
  return <Box>{answer.answer_text}</Box>;
}

export default Answer;
